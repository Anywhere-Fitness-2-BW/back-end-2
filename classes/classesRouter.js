const express = require("express");
const router = express.Router();
const Class = require("./classesModel");

// Get list of classes
router.get("/", async (req, res) => {
  try {
    let classList = await Class.getClasses();
    for (let i = 0; i < classList.length; i++) {
      let instructor = await Class.getClassInstructor(classList[i].id);
      let classType = await Class.getClassType(classList[i].classType);
      let foundDays = await Class.getDays(classList[i].id);
      let days = [];
      for (let k = 0; k < foundDays.length; k++) {
        days.push(foundDays[k].day);
      }
      classList[i] = {
        ...classList[i],
        instructor: instructor[0].displayName,
        classType: classType[0].type,
        days,
      };
    }
    res.status(200).json(classList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get class by id
router.get("/:id", async (req, res) => {
  try {
    let foundClass = await Class.getById(req.params.id);
    let instructor = await Class.getClassInstructor(req.params.id);
    let classType = await Class.getClassType(foundClass[0].classType);
    let foundDays = await Class.getDays(req.params.id);
    let days = [];
    for (let i = 0; i < foundDays.length; i++) {
      days.push(foundDays[i].day);
    }
    res.status(200).json({
      ...foundClass[0],
      instructor: instructor[0].displayName,
      classType: classType[0].type,
      days,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", validateNewClass, async (req, res) => {
  try {
    let instructor = req.body.instructor;
    let days = [];
    for (let i = 0; i < req.body.days; i++) {
      days.push(req.body.days[i]);
    }

    const newClass = {
      ...req.body,
    };

    delete newClass.instructor;
    delete newClass.days;

    // Add new class to classes table and get the id of the new class
    let id = await Class.addClass(newClass);

    // Add classId and instructor id to to classInstructor table
    await Class.addClassInstructor(instructor, id[0]);

    // Add class days to classDays table
    for (let i = 0; i < days.length; i++) {
      let dayId = await Class.getDayId(days[i]);
      console.log(dayId);
      await Class.addClassDay(id[0], dayId.id);
    }

    res.status(201).json({
      message: "Class successfully created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Class.removeClass(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find class with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to delete class",
        error: err,
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Class.getById(id)
    .then((classes) => {
      if (classes) {
        Class.updateClass(changes, id).then((updatedClass) => {
          res.json(updatedClass);
        });
      } else {
        res.status(404).json({ message: "Class ID cannot be found." });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error, Update to class unsuccessful",
        error: err,
      });
    });
});

// Class attendance and attendees below this //

router.get("/:id/attendees", async (req, res) => {
  // Get the account ids that match the given class
  const accountIds = await Class.getAccountIds(req.params.id);
  let accounts = [];
  for (let i = 0; i < accountIds.length; i++) {
    let account = await Class.getAccountById(accountIds[i].accountId);
    accounts.push({
      ...account[0],
      password: undefined,
    });
  }
  res.status(200).json(accounts);
});

router.post("/add-attendee", (req, res) => {
  Class.addAttendee(req.body)
    .then(() => {
      res.status(201).json({
        message: "Client has been added to the classlist.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error adding client to the database.",
        error: err,
      });
    });
});

router.delete("/:classId/remove-attendee/:accountId", (req, res) => {
  Class.removeAttendee(req.params.accountId, req.params.classId)
    .then(() => {
      res.status(200).json({
        message: "Client has been removed from the class list.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Client is still registered for the class.",
        error: err,
      });
    });
});

function validateNewClass(req, res, next) {
  const body = req.body;
  if (
    body.name ||
    body.time ||
    body.duration ||
    body.intensity ||
    body.location ||
    body.maxSize ||
    body.classType
  ) {
    next();
  } else {
    res.status(401).json({
      message: "Missing field",
    });
  }
}

module.exports = router;

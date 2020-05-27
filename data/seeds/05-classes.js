
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("classes")
    .then(function() {
      // Inserts seed entries
      return knex("classes").insert([
        {
          name: "Hot Yoga",
          time: "8AM",
          duration: 1,
          intensity: "Expert",
          location: "Ohio",
          maxSize: "12",
          classType: 12,
          equipmentRequired: 'Yoga Mat',
          arrivalDescription: 'Sign in at front and then head straight back to room A',
          additionalInfo: null,
          cost: 24.99,
          courseDescription: 'Intense yoga session',
          address: '123 Mission Drive, Middletown OH 12345',
          startDate: '06-02-2020'
        },
        {
          name: "Boxing",
          time: "10AM",
          duration: 1.5,
          intensity: "Expert",
          location: "Ohio",
          maxSize: "16",
          classType: 8,
          equipmentRequired: 'Boxing Gloves',
          arrivalDescription: 'Wait in the lobby for the instructor to get you.',
          additionalInfo: 'You must sign a wavier before attending your first session',
          cost: 45.00,
          courseDescription: 'We teach the boxing basics and work toward more advanced techniques.',
          address: '456 Stoney River Dr. Lakewood, OH 45220',
          startDate: '06-02-2020'
        },
        {
          name: "Pilates",
          time: " 2PM",
          duration: 1.5,
          intensity: "Intermediate",
          location: "Ohio",
          maxSize: "16",
          classType: 1,
          equipmentRequired: null,
          arrivalDescription: 'Sign in on the sign in sheet and then go to room B on the left side of the hall.',
          additionalInfo: null,
          cost: 9.99,
          courseDescription: null,
          address: '8585 Willmer St. Magnolia, OH 96785',
          startDate: '06-10-2020'
        },
        {
          name: "Lifting",
          time: " 9AM",
          duration: 1.5,
          intensity: "Beginner",
          location: "Ohio",
          maxSize: "20",
          classType: 6,
          equipmentRequired: null,
          arrivalDescription: 'Please sign in and then pick a rack and a workout partner.',
          additionalInfo: null,
          cost: 14.99,
          courseDescription: 'Proper weight lifting form is taught in this class',
          address: '333 Burton St. Canton, OH 12459',
          startDate: '06-15-2020'
        },
        {
          name: "Running",
          time:  '6PM',
          duration: 1.5,
          intensity: 'Intermediate',
          location: "Ohio",
          maxSize: "12",
          classType: 9,
          equipmentRequired: 'Running shoes, Running clothes',
          arrivalDescription: 'Meet in front of the building.',
          additionalInfo: null,
          cost: 9.99,
          courseDescription: 'Learn about pace setting and how to mange fatigue.',
          address: '789 Bellvue Dr. Hampton, OH 78985',
          startDate: '06-03-2020'
        },
      ]);
    });
};

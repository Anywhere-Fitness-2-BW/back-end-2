const Auth = require('../users/usersModel');

module.exports = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password ) {
        res.status(400).json( "Must provide a username and password" );
    } else {
        Auth.findByUser({ username })
        .first()
        .then(user => {
            console.log(user);
            if (user) {
                res
                    .status(400)
                    .json( "Username already exists, Please try again." );
            } else {
                next();
            }
        })
        .catch(error => {
            res.status(500).json( "Error registering user to the database." )
        });
    }
}
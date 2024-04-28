
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { getUserIDByUsername } = require("../Services/UsersService");
router.get('/github/callback', (request, result) => {
    // The req.query object has the query params that were sent to this route.
    const requestToken = request.query.code;
    console.log(requestToken);
    fetch(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${requestToken}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())

        .then(data => {
            if (data.error) {
                // If the JSON response contains an error field, display a message to the user
                result.status(400).send(`An error occurred with your GitHub authentication: ${data.error_description}\nPlease login again`);
            }
            else {
                const accessToken = data.access_token;
                console.log(data);

                result.redirect(`/welcome?accessToken=${accessToken}`);
            }
        })
        ;
});

router.get('/welcome', (request, result) => {
    const accessToken = request.query.accessToken;
    console.log(accessToken);
    fetch('https://api.github.com/user', {
        headers: {
            Authorization: 'token ' + accessToken
        }
    })
        .then(res => res.json())
        .then(async res => {
            if (res.message) {
                result.status(400).send(`An error occurred with your GitHub authentication: ${res.message} \nPlease login again`);

            }
            else {
                const userID=await getUserIDByUsername(res.login);
                console.log(userID);

                let token;
                try {
                    token = jwt.sign({ user: res.login },
                        JWT_SECRET_KEY,
                        { expiresIn: "1h" });
                }
                catch (err) {
                    console.log(err);
                    const error =
                        new Error("Error! Something went wrong.");
                    result.status(400)
                    result.send(error);
                }

                result.send(`hello ${res.login}
                your jwt is ${token}`);
            }

        })
});
module.exports = router;
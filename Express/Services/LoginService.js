const jwt = require("jsonwebtoken");
const { getOrCreateUserId } = require("../Services/UserService");
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

     async function authAndReturnJWT(requestToken) {
        try {
            const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${requestToken}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            if (data.error) {
                throw new Error(`An error occurred with your GitHub authentication: ${data.error_description}\nPlease login again`);
            }
            const accessToken = data.access_token;
            const userResponse = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: 'token ' + accessToken
                }
            });
            const userData = await userResponse.json();
            if (userData.message) {
                throw new Error(`An error occurred with your GitHub authentication: ${userData.message}\nPlease login again`);
            }
            const userID = await getOrCreateUserId(userData.login, userData.avatar_url);
            const token = jwt.sign({
                userID: userID,
                userName: userData.login,
                userImage: userData.avatar_url
            }, JWT_SECRET_KEY, { expiresIn: "1h" });
            return {
                name: userData.login,
                jwt: token
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

module.exports={authAndReturnJWT};
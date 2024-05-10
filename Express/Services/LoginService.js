const jwt = require("jsonwebtoken");
const { getOrCreateUserId } = require("../Services/UserService");
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

async function authAndReturnJWT(requestToken) {
        console.log(REFRESH_SECRET_KEY);
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
        const token = generateToken(userID, userData.login, userData.avatar_url);
        const refresh = generateToken(userID, userData.login, userData.avatar_url, "24h");
        return {
            name: userData.login,
            jwt: token,
            refresh: refresh
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}
function generateToken(userID, userName, userImage, expiresIn = "15m") {
    let token;
    if (expiresIn === "15m") token = JWT_SECRET_KEY;
    else token = REFRESH_SECRET_KEY;
    return jwt.sign({
        userID: userID,
        userName: userName,
        userImage: userImage
    }, token, { expiresIn: expiresIn });
}
function refreshJWT(refreshToken){
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    return {"jwt": generateToken(decoded.userID, decoded.userName, decoded.userImage)};

}
module.exports = { authAndReturnJWT, refreshJWT };
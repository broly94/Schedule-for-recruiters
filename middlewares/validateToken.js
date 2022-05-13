import jwt from "jsonwebtoken";
import messageError from "../helpers/recruiter/messageError.js";

const verifyToken = (req, res, next) => {

    const token = req.header('auth-token');
    if(!token) res.status(401).json({error: true, message: 'Error, Access Denied'});
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
        next();
    } catch (e) {
        messageError().catchError('Login', 'recruiter', e)
    }

}

export {
    verifyToken
}
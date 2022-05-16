import jwt from "jsonwebtoken";
import messageError from "../helpers/recruiter/messageError.js";

const verifyToken = async (req, res, next) => {
    const token = await req.header('token');
    if(!token) res.status(401).json({error: true, message: 'Error, Access Denied'});
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (e) {
        messageError().catchError('Login', 'recruiter', e)
    }
}

export {
    verifyToken
}
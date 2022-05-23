import jwt from "jsonwebtoken";
import messageError from "../helpers/recruiter/messageError.js";

const verifyToken = async (req, res, next) => {
    
    const token = await req.header('token');
    if(!token) return res.status(401).json({error: true, message: 'Error, Access Denied'});

    try {
        const dataValidated = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = dataValidated;
        next();
    } catch (e) {
        res.status(401).json({error: true, message: 'Token expired'})
        messageError().catchError('Login Validate', 'recruiter', e)
    }
}

export {
    verifyToken
}
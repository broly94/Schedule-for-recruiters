import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    
    const token = await req.header('token');
    if(!token) return res.status(401).json({error: true, message: 'Error, Access Denied'});

    try {
        const dataValidated = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = dataValidated;
        next();
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

export {
    verifyToken
}
import recruiterSchema from "../models/recuiterModel.js";
import messaeError from '../helpers/recruiter/messageError.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const recruiter = await recruiterSchema.findAll({
            where: {
                email
            }
        });

        if(recruiter.length === 0) res.status(404).json({ error: true, message: 'Error, this recruiter doest not exist'});

        const data = recruiter.map(e => {
            return {
                email: e.email,
                password: e.password
            }
        });

        const [dataRecruiter] = data;

        const validationPassword = bcrypt.compareSync(password, dataRecruiter.password);
        if(!validationPassword) res.status(404).json({error: true, message: "Error, do you not can not get into"})

        const token = jwt.sign({
            email: dataRecruiter.email,
            password: dataRecruiter.password
        }, process.env.TOKEN_SECRET, {expiresIn: 60 * 60})

        res.header('token', token)

        res.status(200).json({
            error: false,
            message: "Welcome",
            token
        })

    } catch (e) {
        messaeError().catchError('login', 'recruiter', e)
    }
}

export {
    login
}
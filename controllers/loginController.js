import recruiterSchema from "../models/recuiterModel";
import bcrypt from 'bcrypt';
import messaeError from '../helpers/recruiter/messageError.js'

const login = (req, res) => {

    try {

        const { email, password } = req.body;

        const recruiter = await recruiterSchema.findAll({
            where: {
                email
            }
        });

        if(!recruiter) res.status(400).json({ error: true, message: 'Error, this recruiter doest not exist'});

        console.log(recruiter);

        //const validPassword = await bcrypt.compare(password, recruiter.password);

    } catch (error) {
        const construct = new messaeError();
        construct.catchError('login', 'recruiter', error);
    }


}

export {
    login
}
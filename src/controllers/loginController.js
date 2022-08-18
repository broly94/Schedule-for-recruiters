import { recruitersModel } from "../models";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const recruiter = await recruitersModel.findAll({
            where: {
                email
            }
        });

        if (recruiter.length === 0) return res.status(404).json({ error: true, message: 'Error, this recruiter doest not exist' });

        const data = recruiter.map(e => {
            return {
                name: e.name,
                email: e.email,
                password: e.password
            }
        });


        const [dataRecruiter] = data;

        const validationPassword = bcrypt.compareSync(password, dataRecruiter.password);
        if (!validationPassword) return res.json({ error: true, message: "Error, do you not can not get into" })

        const token = jwt.sign({
            email: dataRecruiter.email,
            password: dataRecruiter.password
        }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 })

        res.header('token', token)

        return res.status(200).json({
            error: false,
            message: "Welcome",
            email: dataRecruiter.email,
            name: dataRecruiter.name
        })

    } catch (e) {
        console.log(e.message)
        return res.json({ error: true, message: e.message })
    }
}

export {
    login
}
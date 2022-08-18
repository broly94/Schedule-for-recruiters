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
        })

        if (recruiter.length === 0) return res.json({ error: true, message: "El usuario o contraseña no coinciden" });

        const data = recruiter.map(e => {
            return {
                name: e.name,
                email: e.email,
                password: e.password
            }
        });

        const [dataRecruiter] = data;

        const validationPassword = bcrypt.compareSync(password, dataRecruiter.password);
        if (!validationPassword) return res.json({ error: true, message: "El usuario o contraseña no coinciden" })

        const token = jwt.sign({
            email: dataRecruiter.email,
            password: dataRecruiter.password
        }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 })

        res.header('token', token)

        return res.json({
            error: false,
            message: "Bienvenido",
            email: dataRecruiter.email,
            name: dataRecruiter.name,
            token
        })

    } catch (e) {
        console.log(e.message)
        return res.json({ error: true, message: e.message })
    }
}

export {
    login
}
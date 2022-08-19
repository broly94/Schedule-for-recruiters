import { recruitersModel } from '../models';
//import { emailUnique } from '../helpers/recruiter/validationEmail.js';
import { findAllRecruiters, findRecruiterById } from '../services/recruiter';

//Bcrypt
import bcrypt from 'bcrypt';
const saltRounds = 10;

const getRecruiters = async (req, res) => {
    //the email is in the validateToken function - middleware
    const { email } = req.user

    try {
        const recruiters = await findAllRecruiters()

        if (recruiters.length === 0) return res.json({ error: true, message: 'No hay registro' })

        return res.json({
            error: false,
            userLogin: email,
            recruiters
        })
    } catch (e) {
        console.log(e.message)
        return res.json({ error: true, message: e.message })
    }
}

const getRecruiter = async (req, res) => {

    const { id } = req.params;
    const { email } = req.user;
    
    try {
        const recruiter = await findRecruiterById(id)

        if (recruiter === undefined || recruiter === null) return res.json({ error: true, message: 'No hay registros' })
    
        return res.json({
            error: false,
            userLogin: email,
            data: recruiter
        })
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const postRecruiter = async (req, res) => {
    try {
        const { name, last_name, email, password, is_premium, is_shared } = req.body
        //Hash password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        //Validation email
        /*const validationEmail = await emailUnique(req, res);
        if (validationEmail.length === 1) return res.status(400).json({
            error: true,
            message: 'Error, there is already a recruiter in database'
        })*/

        //Validate is_premium 
        const premiumNumber = parseInt(is_premium);

        const recruiter = await recruitersModel.create({
            name,
            last_name,
            email,
            password: hash,
            is_premium: premiumNumber,
            is_shared
        });
        if (recruiter.length === 0) res.status(400).json({ error: true, message: 'Error, could is not created recruiter' });

        res.status(200).json({
            error: false,
            message: "Recruiter created",
            data: recruiter
        })
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const putRecruiter = async (req, res) => {
    try {
        const { recruiter_id } = req.params;
        const { name, last_name, password, is_premium, is_shared } = req.body;

        //Hash password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const response = await recruitersModel.update({
            name,
            last_name,
            password: hash,
            is_premium,
            is_shared
        }, {
            where: {
                id: recruiter_id
            }
        })
        if (response === 0) return res.status(404).json({ error: true, message: "Error, could not updated recruiter" });

        const { email } = req.user;

        return res.json({
            error: false,
            userLogin: email,
            message: 'Updated recruiter'
        })
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const deleteRecruiter = async (req, res) => {
    try {
        const { recruiter_id } = req.params;
        const response = await recruitersModel.destroy({
            where: {
                id: recruiter_id
            }
        })
        if (response === 0) return res.status(400).json({ error: true, message: "Error, could not deleted recruiter" });

        const { email } = req.user;

        return res.json({
            error: false,
            userLogin: email,
            message: "Deleted recruiter"
        })
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

export {
    getRecruiter,
    getRecruiters,
    postRecruiter,
    putRecruiter,
    deleteRecruiter
}
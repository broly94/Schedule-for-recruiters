//Schema model recruiter
import recruiterSchema from '../models/recuiterModel.js';
import { emailUnique, getEmail } from '../helpers/recruiter/validationEmail.js';
//Message Errors
import messageError from '../helpers/recruiter//messageError.js';

//Bcrypt
import bcrypt from 'bcrypt';
const saltRounds = 10;

const getRecruiters = async (req, res) => {
    try {
        const recruiters = await recruiterSchema.findAll();
        if (recruiters.length === 0) res.status(400).json({ error: true, message: 'Error, could not get recruiters' })
        const { email } = req.user;
        res.status(200).json({
            error: false,
            userLogin: email,
            recruiters
        })
    } catch (e) {
        res.status(401).json({ error: true, message: 'Error catch capture' })
        messageError().catchError('getting', 'recruiter', e.message);
    }
}

const getRecruiter = async (req, res) => {
    try {
        const id = req.params.id;
        const recruiter = await recruiterSchema.findAll({
            where: {
                id_recruiter: id
            }
        });
        if (recruiter.length == 0) res.status(400).json({ error: true, message: 'Error, cloud not get the recruiter' });

        const { email } = req.user;
        
        res.status(200).json({
            error: false,
            userLogin: email,
            data: recruiter
        })
    } catch (e) {
        res.status(401).json({ error: true, message: 'Error catch capture' })
        messageError().catchError('getting', 'recruiter', e.message);
    }
}

const postRecruiter = async (req, res) => {
    try {
        const { name, last_name, email, password } = req.body
        //Hash password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        //Validation email
        const validationEmail = await emailUnique(req, res);
        if (validationEmail.length === 1) return res.status(400).json({
            error: true,
            message: 'Error, there is already a recruiter in database'
        })
        const recruiter = await recruiterSchema.create({
            name,
            last_name,
            email,
            password: hash
        });
        if (recruiter.length === 0) res.status(400).json({ error: true, message: 'Error, could is not created recruiter' });

        res.status(200).json({
            error: false,
            message: "Recruiter created",
            data: recruiter
        })
    } catch (e) {
        res.status(401).json({ error: true, message: 'Error catch capture' })
        messageError().catchError('saved', 'recruiter', e.message);
    }
}

const putRecruiter = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, last_name, password } = req.body;
        //get Email
        const { email } = await getEmail(req);
        //Hash password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const response = await recruiterSchema.update({
            name,
            last_name,
            email,
            password: hash
        }, {
            where: {
                id_recruiter: id
            }
        })
        if (response === 0) return res.status(404).json({ error: true, message: "Error, could not updated recruiter" });

        const userLogin = req.user;

        return res.json({
            error: false,
            userLogin: userLogin.email,
            message: 'Updated recruiter'
        })
    } catch (e) {
        res.status(401).json({ error: true, message: 'Error catch capture' })
        messageError().catchError('updated', 'recruiter', e);
    }
}

const deleteRecruiter = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await recruiterSchema.destroy({
            where: {
                id_recruiter: id
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
        res.status(401).json({ error: true, message: 'Error catch capture' })
        messageError().catchError('deleted', 'recruiter', e.message);
    }
}

export {
    getRecruiter,
    getRecruiters,
    postRecruiter,
    putRecruiter,
    deleteRecruiter
}
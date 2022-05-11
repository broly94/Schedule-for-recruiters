//Schema model recruiter
import recruiterSchema from '../models/recuiterModel.js';
import { emailUnique } from '../helpers/recruiter/emailUnique.js';
//Message Errors
import messageError from '../helpers/recruiter//messageError.js';
const construct = new messageError();
//Bcrypt
import bcrypt from 'bcrypt';
const saltRounds = 10;


const getRecruiters = async (req, res) => {
    try {
        const recruiter = await recruiterSchema.findAll();
        if (recruiter.length === 0) res.status(400).json({ error: true, message: 'Error, could not get recruiters' })
        res.status(200).json({
            error: false,
            data: recruiter
        })
    } catch (e) {
        construct.catchError('getting', 'recruiter', e.message);
    }
}

const getRecruiter = async (req, res) => {
    try {

        const id = req.params.id;
        const recruiter = await recruiterSchema.findAll({
            where: {
                id
            }
        });

        if (recruiter.length == 0) res.status(400).json({ error: true, message: 'Error, cloud not get the recruiter' });
        res.status(200).json({
            error: false,
            data: recruiter
        })

    } catch (e) {
        construct.catchError('getting', 'recruiter', e.message);
    }
}

const postRecruiter = async (req, res) => {
    try {
        const { name, last_name, email, password } = req.body

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const validatorEmail = await emailUnique(req, res);
        
        if(validatorEmail.length === 1) return res.status(400).json({
            error: true,
            message: 'Error, there is already a recruiter in database'
        })

        const recruiter = await recruiterSchema.create({
            name,
            last_name,
            email,
            password: hash
        });
        if (recruiter.length === 0) res.status(400).json({ error: true, message: 'Error, could is not created recruiter' })
        res.status(200).json({
            error: false,
            message: "Recruiter created",
            data: recruiter
        })
    } catch (e) {
        construct.catchError('saved', 'recruiter', e.message);
    }
}

const putRecruiter = async (req, res) => {
    try {
        
        const id = req.params.id;
        const { name, last_name, email, password } = req.body;
        
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        
        const validatorEmail = await emailUnique(req);

        if(validatorEmail.length === 1) return res.status(400).json({
            error: true,
            message: 'Error, there is already a recruiter in database'
        })

        const response = await recruiterSchema.update({
            name,
            last_name,
            email,
            password: hash
        }, {
            where: {
                id
            }
        })

        if (response === 0) return res.status(400).json({ error: true, message: "Error, could not updated recruiter" });
        return res.json({
            error: false,
            message: 'Updated recruiter'
        })

    } catch (e) {
        construct.catchError('updated', 'recruiter', e);
    }
}

const deleteRecruiter = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await recruiterSchema.destroy({
            where: {
                id
            }
        })
        if (response === 0) return res.status(400).json({ error: true, message: "Error, could not deleted recruiter" });
        return res.json({
            error: false,
            message: "Deleted recruiter"
        })
    } catch (e) {
        construct.catchError('deleted', 'recruiter', e.message);
    }
}

export {
    getRecruiter,
    getRecruiters,
    postRecruiter,
    putRecruiter,
    deleteRecruiter
}
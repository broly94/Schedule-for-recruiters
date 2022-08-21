import { recruitersModel } from '../models';
//import { emailUnique } from '../helpers/recruiter/validationEmail.js';
import { createRecruiter, findAllRecruiters, findRecruiterById, updateRecruiterById } from '../services/recruiter';

//Bcrypt
import bcrypt from 'bcrypt';
const saltRounds = 10;

const getRecruiters = async (req, res) => {
    //the email is in the validateToken function - middleware
    const { email } = req.user

    try {
        const recruiters = await findAllRecruiters()
        console.log(recruiters)
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

        if (recruiter === undefined || recruiter === null) return res.json({ error: true, message: 'No hay registro' })
    
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
        
        const requestRecruiter = req.body

        const recruiter = await createRecruiter(requestRecruiter)
        
        if (recruiter === null) return res.json({ error: true, message: 'El email ya está registrado' })
        if (recruiter === undefined) return res.json({ error: true, message: 'Faltan ingresar datos' })

        return res.json({
            error: false,
            message: "Usuario creado correctamente",
            recruiter
        })
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const putRecruiter = async (req, res) => {
    try {
        const { id } = req.params;
        const requestRecruiter = req.body;

        const recruiter = await updateRecruiterById(id, requestRecruiter)

        if (recruiter === 0 || recruiter === undefined) return res.json({ error: true, message: "No se pudo actualizar los datos" })

        const { email } = req.user;

        return res.json({
            error: false,
            userLogin: email,
            message: 'Datos actualizados'
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
        if (response === 0) return res.json({ error: true, message: "Error, could not deleted recruiter" });

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
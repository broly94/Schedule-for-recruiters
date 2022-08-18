import { candidatesModel, candidatesTechnologiesModel, englishLevelModel, senioritiesModel, socialMediaModel, technologiesModel } from '../models/index.js';

import { findAllCandidates, findCandidateById, updateCandidateById } from '../services/candidate'

const getCandidates = async (req, res) => {

    try {
        const candidates = await findAllCandidates()

        if (candidates.length === 0) {
            return res.json({ error: true, message: 'Error: No existen candidatos' })
        }

        return res.json({ error: false, candidates: candidates })
    } catch (e) {
        console.log(e.message)
        return res.json({ error: true, message: e.message })
    }
}

const getCandidate = async (req, res) => {

    try {
        const { id } = req.params;

        const candidate = await findCandidateById(id)

        if (candidate === null) return res.json({ error: true, message: 'Error el candidato no existe' })

        return res.json({ error: false, candidato: candidate })
    } catch (e) {
        console.log(e.message)
        return res.json({ error: true, message: e.message })
    }
}

const putCandidate = async (req, res) => {
    try {
        const { id } = req.params;

        const requestCandidate = req.body

        const candidate = await updateCandidateById(id, requestCandidate)

        if (candidate === undefined) {
            return res.json({ error: true, message: 'Error al actualizar el candidato' })
        }

        return res.json({
            erorr: false,
            message: 'Candidato actualizado correctamente'
        });
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const postCandidate = async (req, res) => {

    try {

        const { name, last_name, email, available, remuneration, description, image, english_level_id, seniority_id, social_media, technologies } = req.body

        //Create new candidate
        const newCandidate = await candidatesModel.create(
            {
                name,
                last_name,
                email,
                available,
                remuneration,
                description,
                image,
                english_level_id,
                seniority_id
            }
        )

        //Add technologies to candidate
        technologies.map(async (tech) => {
            const tec = await technologiesModel.findByPk(tech);
            newCandidate.addTechnologies(tec, { through: candidatesTechnologiesModel });
        })

        const { id } = newCandidate;

        //Get social media request
        const { facebook, instagram, linkedin } = social_media;

        //Create social media
        await socialMediaModel.create({
            candidate_id: id,
            facebook,
            instagram,
            linkedin
        })

        res.status(200).json({
            message: 'Candidato creado correctamente',
            candidato: newCandidate
        });
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const deleteCandidate = async (req, res) => {

    try {

        const { id } = req.params;

        //Deleted technologies
        const candidateForId = await candidatesModel.findByPk(id);

        if (candidateForId === null) return res.json({ error: true, message: 'Error, el candidato no existe' })

        const technologiesAll = await candidateForId.getTechnologies({ through: candidatesTechnologiesModel })

        await candidateForId.removeTechnologies(technologiesAll, { through: candidatesTechnologiesModel })

        //Deleted social media
        await socialMediaModel.destroy({
            where: {
                candidate_id: id
            }
        })

        //Deleted candidate
        await candidatesModel.destroy({
            where: {
                id
            }
        });

        return res.status(200).json({
            error: false,
            message: 'Candidato eliminado correctamente'
        })

    } catch (e) {
        console.log(e.message)
        return res.json({ error: true, message: e.message })
    }
}

export {
    getCandidate,
    getCandidates,
    putCandidate,
    postCandidate,
    deleteCandidate
}
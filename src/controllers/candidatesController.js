import candidatesModel from '../models/candidatesModel.js';
import candidatesTechnologiesModel from '../models/candidatesTechnoligiesModel.js';
import englishLevelModel from '../models/englishLevelModel.js';
import senioritiesModel from '../models/senioritiesModel.js';
import socialMediaModel from '../models/socialMediaModel.js';
import technologiesModel from '../models/technologiesModel.js';

const getCandidates = async (req, res) => {
    try {
        const candidates = await candidatesModel.findAll({
            include: [
                {
                    model: socialMediaModel,
                    attributes: ['facebook', 'linkedin', 'instagram']
                },
                {
                    model: senioritiesModel,
                    attributes: ['seniority']
                },
                {
                    model: englishLevelModel,
                    attributes: ['level']
                },
                {
                    model: technologiesModel,
                    through: { attributes: [] },
                    attributes: ['technology']
                }
            ]
        });

        if (candidates.length === 0) return res.status(404).json({ error: true, message: 'Error: Not exist candidates in the database' })

        res.json({
            candidates
        })
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const getCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const candidate = await candidatesModel.findOne({
            where: {
                id
            },
            include: [
                {
                    model: socialMediaModel,
                    attributes: ['facebook', 'linkedin', 'instagram']
                },
                {
                    model: senioritiesModel,
                    attributes: ['seniority']
                },
                {
                    model: englishLevelModel,
                    attributes: ['level']
                },
                {
                    model: technologiesModel,
                    through: { attributes: [] },
                    attributes: ['technology']
                }
            ]
        });
        if (candidate.length === 0) { return res.status(404).json({ error: true, message: 'Error not exist this candidate in the database' }) }
        res.json({
            error: false,
            candidate
        })
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const putCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            last_name,
            email,
            available,
            remuneration,
            description,
            image,
            english_level_id,
            seniorities_id,
            social_media,
            technologies
        } = req.body

        const candidate = await candidatesModel.update({
            name,
            last_name,
            email,
            available,
            remuneration,
            description,
            image,
            english_level_id,
            seniorities_id
        },
            {
                where: {
                    id
                }
            }
        );

        //Update technologies
        const candidateForId = await candidatesModel.findByPk(id);
        candidateForId.setTechnologies([], { through: candidatesTechnologiesModel });
        for (let i = 0; i < technologies.length; i++) {
            const tec = await technologiesModel.findByPk(technologies[i]);
            candidateForId.addTechnologies(tec, { through: candidatesTechnologiesModel });
        }

        //Update social media
        const { facebook, instagram, linkedin } = social_media;
        await socialMediaModel.update({
            facebook, instagram, linkedin
        },
            {
                where: {
                    id_postulant: id
                }
            }
        );

        if (candidate.length === 0) { return res.status(404).json({ error: true, message: 'Error at updating the candidate' }) }
        res.status(200).json({
            erorr: false,
            message: 'Candidate updating correctly'
        });
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const postCandidate = async (req, res) => {
    try {
        const {
            name,
            last_name,
            email,
            available,
            remuneration,
            description,
            image,
            english_level_id,
            seniorities_id,
            social_media,
            technologies
        } = req.body

        const newCandidate = await candidatesModel.create({
            name,
            last_name,
            email,
            available,
            remuneration,
            description,
            image,
            english_level_id,
            seniorities_id,
        });

        for (let i = 0; i < technologies.length; i++) {
            const tec = await technologiesModel.findByPk(technologies[i]);
            newCandidate.addTechnologies(tec, { through: candidatesTechnologiesModel });
        }

        let { id } = newCandidate;
        const { facebook, instagram, linkedin } = social_media;

        await socialMediaModel.create({
            id_candidate: id,
            facebook,
            instagram,
            linkedin
        })

        res.status(200).json({
            message: 'Candidate created',
            newCandidate
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
        candidateForId.removeTechnologies({ through: candidatesTechnologiesModel });

        //Deleted social media
        await socialMediaModel.destroy({
            where: {
                id_postulant: id
            }
        })

        const candidate = await candidatesModel.destroy({
            where: {
                id
            }
        });

        if (candidate.length === 0) { return res.status(404).json({ error: true, message: 'Error, not could deleted candidate' }) }
        res.status(200).json({
            error: false,
            message: 'Candidate deleted correctly'
        })
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

export {
    getCandidate,
    getCandidates,
    putCandidate,
    postCandidate,
    deleteCandidate
}
import applicantsSchema from '../models/applicantsModel.js';
import applicantsTechnologiesSchema from '../models/applicantsTechnoligiesModel.js';
import levelEnglishesSchema from '../models/levelEnglishesModel.js';
import senioritiesSchema from '../models/senioritiesModel.js';
import socialMediaSchema from '../models/socialMediaModel.js';
import technologiesSchema from '../models/technologiesModel.js';

const getAtpplicants = async (req, res) => {
    try {
        const applicants = await applicantsSchema.findAll({
            include: [
                {
                    model: socialMediaSchema,
                    attributes: ['facebook', 'linkedin', 'instagram']
                },
                {
                    model: senioritiesSchema,
                    attributes: ['seniority']
                },
                {
                    model: levelEnglishesSchema,
                    attributes: ['level']
                },
                {
                    model: technologiesSchema,
                    through: { attributes: [] },
                    attributes: ['technology']
                }
            ]
        });

        if (applicants.length === 0) return res.status(404).json({ error: true, message: 'Error: Not exist applicants in the database' })

        res.json({
            applicants
        })
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const getAtpplicant = async (req, res) => {
    try {
        const { id } = req.params;
        const applicant = await applicantsSchema.findOne({
            where: {
                id
            },
            include: [
                {
                    model: socialMediaSchema,
                    attributes: ['facebook', 'linkedin', 'instagram']
                },
                {
                    model: senioritiesSchema,
                    attributes: ['seniority']
                },
                {
                    model: levelEnglishesSchema,
                    attributes: ['level']
                },
                {
                    model: technologiesSchema,
                    through: { attributes: [] },
                    attributes: ['technology']
                }
            ]
        });
        if (applicant.length === 0) { return res.status(404).json({ error: true, message: 'Error not exist this Applicant in the database' }) }
        res.json({
            error: false,
            applicant
        })
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const putApplicant = async (req, res) => {
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
            level_englishes_id,
            seniorities_id,
            social_media,
            technologies
        } = req.body

        const applicant = await applicantsSchema.update({
            name,
            last_name,
            email,
            available,
            remuneration,
            description,
            image,
            level_englishes_id,
            seniorities_id
        },
            {
                where: {
                    id
                }
            }
        );

        //Update technologies
        const applicantId = await applicantsSchema.findByPk(id);
        applicantId.setTechnologies([], { through: applicantsTechnologiesSchema });
        for (let i = 0; i < technologies.length; i++) {
            const tec = await technologiesSchema.findByPk(technologies[i]);
            applicantId.addTechnologies(tec, { through: applicantsTechnologiesSchema });
        }

        //Update social media
        const { facebook, instagram, linkedin } = social_media;
        await socialMediaSchema.update({
            facebook, instagram, linkedin
        },
            {
                where: {
                    id_postulant: id
                }
            }
        );

        if (applicant.length === 0) { return res.status(404).json({ error: true, message: 'Error at updating the applicant' }) }
        res.status(200).json({
            erorr: false,
            message: 'Applicant updating correctly'
        });
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const postApplicants = async (req, res) => {
    try {
        const {
            name,
            last_name,
            email,
            available,
            remuneration,
            description,
            image,
            level_englishes_id,
            seniorities_id,
            social_media,
            technologies
        } = req.body

        const newApplicant = await applicantsSchema.create({
            name,
            last_name,
            email,
            available,
            remuneration,
            description,
            image,
            level_englishes_id,
            seniorities_id,
        });

        for (let i = 0; i < technologies.length; i++) {
            const tec = await technologiesSchema.findByPk(technologies[i]);
            newApplicant.addTechnologies(tec, { through: applicantsTechnologiesSchema });
        }

        let { id } = newApplicant;

        const { facebook, instagram, linkedin } = social_media;

        await socialMediaSchema.create({
            id_postulant: id,
            facebook,
            instagram,
            linkedin
        })

        res.status(200).json({
            message: 'Postulant created',
            newApplicant
        });
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const deleteApplicant = async (req, res) => {
    try {
        const { id } = req.params;

        //Deleted technologies
        const applicantId = await applicantsSchema.findByPk(id);

        applicantId.removeTechnologies({ through: applicantsTechnologiesSchema });

        //Deleted social media
        await socialMediaSchema.destroy({
            where: {
                id_postulant: id
            }
        })

        const applicant = await applicantsSchema.destroy({
            where: {
                id
            }
        });

        if (applicant.length === 0) { return res.status(404).json({ error: true, message: 'Error, not could deleted applicant' }) }
        res.status(200).json({
            error: false,
            message: 'Applicant deleted correctly'
        })
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

export {
    getAtpplicants,
    getAtpplicant,
    putApplicant,
    postApplicants,
    deleteApplicant
}
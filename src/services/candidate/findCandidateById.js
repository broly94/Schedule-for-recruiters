import { candidatesModel, socialMediaModel, senioritiesModel, englishLevelModel, technologiesModel } from "../../models"

export const findCandidateById = async (id) => {

    try {
        return await candidatesModel.findOne({
            where: {
                id
            },
            attributes: ['id', 'name', 'last_name', 'email', 'available', 'remuneration', 'description', 'image'],
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
        })
    } catch (e) {
        console.log(e.message)
    }
}
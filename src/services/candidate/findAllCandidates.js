import { candidatesModel, socialMediaModel, senioritiesModel, englishLevelModel, technologiesModel } from "../../models"

export const findAllCandidates = async () => {

    try {

        return await candidatesModel.findAll({
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
        return e.message
    }

}
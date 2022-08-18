import { candidatesModel, englishLevelModel, senioritiesModel, socialMediaModel, technologiesModel } from "../../models"

export const findAllTechnologies = async () => {

    try {
        
        return await technologiesModel.findAll({
            attributes: ["technology"],
            include: [
                {
                    model: candidatesModel,
                    through: { attributes: [] },
                    attributes: ["name", "last_name", "available", "remuneration", "description", "image"]
                }
            ]
        })

    } catch (e) {
        console.log(e.message)
    }

}
import { candidatesModel, englishLevelModel, recruitersModel, senioritiesModel, socialMediaModel, technologiesModel } from "../../models"

export const findRecruiterById = async (id) => {

    try {
        if (id === undefined || id === "") return undefined
        const recruiter = await recruitersModel.findOne(
            {
                where: {
                    id
                },
                attributes: ["name", "last_name", "email", "is_premium"],
                include: [
                    {
                        model: candidatesModel,
                        through: { attributes: [] },
                        attributes: ["name", "last_name", "email", "available", "remuneration", "description", "image"],
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
                    }
                ]
            })
        console.log(recruiter)
        return recruiter
    } catch (e) {
        console.log(e.message)
    }

}
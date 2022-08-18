import { candidatesModel, technologiesModel } from "../../models"

export const findTechnoloyByName = async (technology) => {

    try {
        if (technology === undefined || technology === "") return undefined
        return await technologiesModel.findOne(
            {
                where: {
                    id: technology
                }, 
                attributes: ["technology"],
                include: [
                    {
                        model: candidatesModel,
                        through: { attributes: [] },
                        attributes: ["name", "last_name", "available", "remuneration", "description", "image"]
                    }
                ]
            }
        )
    } catch (e) {
        console.log(e.message)
    }
}
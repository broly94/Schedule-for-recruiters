import { recruitersModel } from "../../models"

export const findRecruiterById = async (id) => {

    try {
        if (id === undefined || id === "") return undefined
        return await recruitersModel.findOne(
            {
                where: {
                    id
                },
                attributes: ["name", "last_name", "email", "is_premium", "is_shared"]
            })
    } catch (e) {
        console.log(e.message)
    }

}
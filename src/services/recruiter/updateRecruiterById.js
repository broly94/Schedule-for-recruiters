import { recruitersModel } from "../../models"

export const updateRecruiterById = async (id, candidate) => {

    if (id === undefined || id === "") return undefined
    if (candidate === undefined || candidate === "") return undefined

    //validate so that the password does not come
    if (Object.keys(candidate).includes('password')) return undefined

    try {
        return await recruitersModel.update(candidate, { where: { id } })
    } catch (e) {
        console.log(e.message)
    }


}
import { recruitersModel } from "../../models"

export const findAllRecruiters = async () => {

    try {
        const recruiters = await recruitersModel.findAll()    
        return recruiters
    } catch (e) {
        console.log(e.message)
    }

}
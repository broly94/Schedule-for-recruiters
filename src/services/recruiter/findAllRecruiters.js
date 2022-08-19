import { recruitersModel } from "../../models"

export const findAllRecruiters = async () => {

    try {
        return await recruitersModel.findAll()    
    } catch (e) {
        console.log(e.message)
    }

}
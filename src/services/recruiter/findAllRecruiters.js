import { recruitersModel, recruitersCandidatesModel, candidatesModel } from "../../models"

export const findAllRecruiters = async () => {

    try {
        const recruiter=  await recruitersModel.findAll({
            include: {
                model: recruitersCandidatesModel,
                include: candidatesModel
            }
        })    
        console.log(recruiter)
        return recruiter
    } catch (e) {
        console.log(e.message)
    }

}
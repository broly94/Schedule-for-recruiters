import { candidatesModel, socialMediaModel, candidatesTechnologiesModel } from '../../models'

export const deleteCandidateById = async (id) => {

    try {
        if (id === undefined || id === "") return undefined

        const candidate = await candidatesModel.findByPk(id)

        const tech = await candidate.getTechnologies({ through: candidatesTechnologiesModel })
        
        if (tech != undefined) {
            await candidate.removeTechnologies(tech, { through: candidatesTechnologiesModel })
        }

        await socialMediaModel.destroy({ where: { candidate_id: id } })

        return await candidatesModel.destroy({ where: { id } })
    } catch (e) {
        console.log(e.message)
    }

}
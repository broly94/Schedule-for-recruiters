import { candidatesModel, candidatesTechnologiesModel, socialMediaModel, technologiesModel } from "../../models"

export const createCandidate = async ({ technologies, social_media, ...rest }) => {

    try {
        const candidate = await candidatesModel.create({ ...rest })

        if (technologies != undefined) {
            technologies.map(async (tech) => {
                const tec = await technologiesModel.findByPk(tech)
                await candidate.addTechnologies(tec, { through: candidatesTechnologiesModel })
            })
        }

        if (social_media != undefined) {
            await socialMediaModel.create({ candidate_id: candidate.id, ...social_media })
        }

        return candidate
    } catch (e) {
        console.log(e)
    }

}
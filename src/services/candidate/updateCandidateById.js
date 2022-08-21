import { candidatesModel, candidatesTechnologiesModel, socialMediaModel } from "../../models";
import { updateTechnologies } from "./helpers";

export const updateCandidateById = async (id, requestCandidate) => {

    const { social_media, technologies, ...rest } = requestCandidate

    try {
        //Get the candidate
        const candidate = await candidatesModel.findByPk(id);

        if (technologies != undefined) {
            //Set technologies []
            await candidate.setTechnologies([], { through: candidatesTechnologiesModel })
            //Read the technologies currently in the candidate and add or remove technologies
            await updateTechnologies(candidate, technologies)
        }

        if (social_media != undefined) {
            //Update social media
            const candidateSocial = await socialMediaModel.findOne({ where: { candidate_id: id } })
            //Verify the social media
            if (candidateSocial === null) {
                await socialMediaModel.create({ candidate_id: id, ...social_media })
            } else {
                await socialMediaModel.update({ ...social_media }, { where: { candidate_id: id } })
            }
        }

        return await candidatesModel.update(rest, { where: { id } })
    } catch (e) {
        console.log(e.message)
    }

}
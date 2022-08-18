import { technologiesModel } from '../../models'

export const createTechnologies = async (technology) => {

    try {
        if (technology === undefined || technology === "") return undefined
        return await technologiesModel.create({ technology })
    } catch (e) {
        console.log(e.message)
    }
}
import { candidatesTechnologiesModel } from "../../../models"

export const updateTechnologies = async (candidate, technologies) => {

    const technologiesAll = await candidate.getTechnologies({ through: candidatesTechnologiesModel })

    const technologiesIdCurrentArray = technologiesAll.map(tec => tec.dataValues.id)

    const TechnologiesAllArray = technologiesIdCurrentArray.concat(technologies)

    const technologiesClear = TechnologiesAllArray.filter((tech, index) => {
        return TechnologiesAllArray.indexOf(tech) === index;
    })

    await candidate.addTechnologies(technologiesClear, { through: candidatesTechnologiesModel })
}
export const updateTechnologies = async (candidateForId, technologies ,candidatesTechnologiesModel) => {
    const technologiesAll = await candidateForId.getTechnologies({ through: candidatesTechnologiesModel });
    const technologiesIdCurrentArray = technologiesAll.map( tec => tec.dataValues.id)
    const TechnologiesAllArray = technologiesIdCurrentArray.concat(technologies)
    const technologiesClear = TechnologiesAllArray.filter( (tech, index) => {
        return TechnologiesAllArray.indexOf(tech) === index;
    })
    await candidateForId.addTechnologies(technologiesClear, { through: candidatesTechnologiesModel })
}
import { candidatesModel, englishLevelModel, senioritiesModel, socialMediaModel, technologiesModel, recruitersModel, recruitersCandidatesModel } from "./index.js";

//candidates association
candidatesModel.hasOne(socialMediaModel, { foreignKey: 'candidate_id' })
candidatesModel.belongsTo(englishLevelModel, { foreignKey: 'english_level_id' })
candidatesModel.belongsTo(senioritiesModel, { foreignKey: 'seniority_id' })
candidatesModel.belongsToMany(technologiesModel, { through: 'candidatestechnologies' })
candidatesModel.belongsToMany(recruitersModel, { through: 'recruiterscandidates'})

//technologies association
technologiesModel.belongsToMany(candidatesModel, { through: 'candidatestechnologies' })

//recruiters associations
recruitersModel.belongsToMany(candidatesModel, { through: 'recruiterscandidates'})
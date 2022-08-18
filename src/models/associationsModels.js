import { candidatesModel, englishLevelModel, senioritiesModel, socialMediaModel, technologiesModel } from "./index.js";

//candidates association
candidatesModel.hasOne(socialMediaModel, { foreignKey: 'candidate_id' });
candidatesModel.belongsTo(englishLevelModel, { foreignKey: 'english_level_id' });
candidatesModel.belongsTo(senioritiesModel, { foreignKey: 'seniority_id' });
candidatesModel.belongsToMany(technologiesModel, { through: 'candidatestechnologies' });
technologiesModel.belongsToMany(candidatesModel, { through: 'candidatestechnologies' });
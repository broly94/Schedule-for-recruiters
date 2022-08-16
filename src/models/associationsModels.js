import candidatesModel from "./candidatesModel.js";
import englishLevelModel from "./englishLevelModel.js";
import senioritiesModel from "./senioritiesModel.js";
import socialMediaModel from "./socialMediaModel.js";
import technologiesModel from "./technologiesModel.js";

//candidates association
candidatesModel.hasOne(socialMediaModel, { foreignKey: 'candidate_id' });
candidatesModel.belongsTo(englishLevelModel, { foreignKey: 'english_level_id' });
candidatesModel.belongsTo(senioritiesModel, { foreignKey: 'seniorities_id' }); 
candidatesModel.belongsToMany(technologiesModel, { through: 'candidatestechnologies' });
technologiesModel.belongsToMany(candidatesModel, { through: 'candidatestechnologies' });
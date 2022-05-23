import applicantsSchema from "./applicantsModel.js";
import levelEnglishesSchema from "./levelEnglishesModel.js";
import senioritiesSchema from "./senioritiesModel.js";
import socialMediaSchema from "./socialMediaModel.js";
//import technologiesSchema from "./technologiesModel.js";

//Applicants association
applicantsSchema.hasOne(socialMediaSchema, { foreignKey: 'id_postulant' });
applicantsSchema.belongsTo(levelEnglishesSchema, { foreignKey: 'level_englishes_id' });
applicantsSchema.belongsTo(senioritiesSchema, { foreignKey: 'seniorities_id' }); 
//applicantsSchema.belongsTo(technologiesSchema, { foreignKey: 'technologies_id' });
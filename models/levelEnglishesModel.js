import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const levelEnglishesSchema = sequelize.define('level_englishes', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    level: {
        type: DataTypes.STRING
    }  
},
    {
        timestamps: false
    }
)

export default levelEnglishesSchema;
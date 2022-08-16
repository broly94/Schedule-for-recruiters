import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const englishLevelModel = sequelize.define('english_level', {

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

export default englishLevelModel;
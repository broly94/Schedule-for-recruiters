import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const senioritiesSchema = sequelize.define('seniorities', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seniority: {
        type: DataTypes.STRING
    }
},
    {
        timestamps: false
    }
)

export default senioritiesSchema;
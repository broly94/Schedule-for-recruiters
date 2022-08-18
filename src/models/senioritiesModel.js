import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

export const senioritiesModel = sequelize.define('seniorities', {
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
import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

export const technologiesModel = sequelize.define('technologies', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    technology: {
        type: DataTypes.STRING
    }

},
    {
        timestamps: false
    }
)
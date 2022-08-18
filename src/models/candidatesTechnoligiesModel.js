import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

export const candidatesTechnologiesModel = sequelize.define('candidatestechnologies', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
    candidateId: {
        type: DataTypes.INTEGER
    },
    technologyId: {
        type: DataTypes.INTEGER
    }

},
    {
        timestamps: true
    }
)
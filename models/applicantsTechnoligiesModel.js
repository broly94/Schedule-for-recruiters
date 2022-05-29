import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const applicantsTechnologiesSchema = sequelize.define('applicantstechnologies', {

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
    applicantId: {
        type: DataTypes.INTEGER
    },
    technologiId: {
        type: DataTypes.INTEGER
    }

},
    {
        timestamps: true
    }
)

export default applicantsTechnologiesSchema;
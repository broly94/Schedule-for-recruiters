import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const technologiesSchema = sequelize.define('technologies', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    technologies: {
        type: DataTypes.STRING
    }

},
    {
        timestamps: false
    }
);

export default technologiesSchema;
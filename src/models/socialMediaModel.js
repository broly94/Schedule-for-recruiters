import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

export const socialMediaModel = sequelize.define('social_media', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    candidate_id: {
        type: DataTypes.INTEGER,
        unique: true
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
   }
)
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

export const recruitersModel = sequelize.define('recruiters', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true,
        allowNull: false,
        validate: {
            isEmail: true
        },
    },
    password: {
        type: DataTypes.STRING,
    },
    is_premium: {
        type: DataTypes.BOOLEAN,
    },
    is_shared_candidate: {
        type: DataTypes.BOOLEAN,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
    }
},
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true
    }
)
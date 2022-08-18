import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

export const candidatesModel = sequelize.define('candidates', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            isEmail: true
        }
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    remuneration: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        validate: {
            isDecimal: true
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    english_level_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            notNull: true,
            notEmpty: true
        }
    },
    seniority_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            notNull: true,
            notEmpty: true
        },
    }
},
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true
    }
)
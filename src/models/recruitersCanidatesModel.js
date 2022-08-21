import { DataTypes } from 'sequelize'
import sequelize  from '../db/connection.js'

export const candidatesRecruitersModel = sequelize.define('CandidatesRecruiters', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    recruiterId: {
        type: DataTypes.INTEGER,
    },
    candidateId: {
        type: DataTypes.INTEGER,
    }
},
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true
    }
)
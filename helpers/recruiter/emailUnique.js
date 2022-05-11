//import express from "express";
import recruiterSchema from "../../models/recuiterModel.js"

const emailUnique = async (req) => {
    
    const { email } = req.body;
    
    const recruiterEmail = await recruiterSchema.findAll({
        where: {
            email
        }
    })

    return recruiterEmail

}

export {
    emailUnique
}
import recruiterSchema from "../../models/recuiterModel.js"

const emailUnique = async (req) => {
    
    const { email } = req.body;
    
    const recruiter = await recruiterSchema.findAll({
        where: {
            email
        }
    })

    return recruiter

}

const getEmail = async (req) => {

    const id = req.params.id;

    const recruiter = await recruiterSchema.findAll({
        where: {
            id
        }
    })

    const email = recruiter.map(e => e.email);

    return email
}

export {
    emailUnique,
    getEmail
}
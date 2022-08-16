import recruitersModel from "../../models/recruitersModel.js"

const emailUnique = async (req) => {
    
    const { email } = req.body;
    
    const recruiter = await recruitersModel.findAll({
        where: {
            email
        }
    })

    return recruiter

}

const getEmail = async (req) => {

    const id = req.params.id;

    const recruiter = await recruitersModel.findAll({
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
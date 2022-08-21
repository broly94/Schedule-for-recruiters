import { recruitersModel } from "../../models"
import { emailUnique } from "../../helpers/emailUnique";
import bcrypt from 'bcrypt';

export const createRecruiter = async (recruiter) => {

    const { email, password, ...rest } = recruiter
    
    if (recruiter === undefined) return undefined
    if(password === undefined || password === "") return undefined

    const saltRound = 10;
    const salt = bcrypt.genSaltSync(saltRound)
    const passwordHash = bcrypt.hashSync(password, salt)

    try {
        const response = await emailUnique(recruitersModel, email)
        if(response !== null){
            return await recruitersModel.create({ email, password: passwordHash, ...rest });
        }else {
            return null
        }
    } catch (e) {
        console.log(e.message)
    }


}
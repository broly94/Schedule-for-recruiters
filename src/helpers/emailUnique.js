
export const emailUnique = async (model, email) => {

    try {
        if(email === undefined || email === "") return undefined
        return await model.findOne({ where: { email } })
    } catch (e) {
        console.log(e.message)
    }

}
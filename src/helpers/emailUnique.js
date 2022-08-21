
export const emailUnique = async (model, email) => {

    if (email === undefined || email === "") return undefined
    try {
        const data = await model.findOne({ where: { email } })
        if(data.email === null) {
            return data.email
        }else {
            return null
        }
    } catch (e) {
        console.log(e.message)
    }

}
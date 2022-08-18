import { createTechnologies, findAllTechnologies, findTechnoloyByName } from "../services/technologies"

export const postTechnologies = async (req, res) => {

    try {
        const { technology } = req.body

        const response = await createTechnologies(technology)

        if (response === undefined) return res.json({ error: true, message: "Error al ingresar la tecnologia" })

        return res.json({
            error: false,
            message: "Tecnologia creada correctamente"
        })
    } catch (e) {
        console.log(e.message)
        return res.json({
            error: true,
            message: e.message
        })
    }
}

export const getTechnologies = async (req, res) => {

    try {
        const technologies = await findAllTechnologies()
        if (technologies.length === 0) return res.json({ error: false, message: "No hay tecnologias registradas" })
        return res.json({
            error: false,
            technologies
        })
    } catch (e) {
        console.log(e.message)
        return res.json({
            error: true,
            message: e.message
        })
    }
}

export const getTechnologyByName = async (req, res) => {

    try {
        const { technology } = req.params
        console.log(technology)
        const response = await findTechnoloyByName(technology)
        //if (response.length === 0) return res.json({ error: false, message: "La tecnologia seleccionada no existe" })
        return res.json({
            error: false,
            technology: response
        })
    } catch (e) {
        console.log(e.message)
        return res.json({
            error: true,
            message: e.message
        })
    }

}
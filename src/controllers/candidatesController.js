import { createCandidate, deleteCandidateById, findAllCandidates, findCandidateById, updateCandidateById } from '../services/candidate'

const getCandidates = async (req, res) => {

    try {
        const candidates = await findAllCandidates()

        if (candidates.length === 0) {
            return res.json({ error: true, message: 'Error: No existen candidatos' })
        }

        return res.json({ error: false, candidates })
    } catch (e) {
        console.log(e.message)
        return res.json({ error: true, message: e.message })
    }
}

const getCandidate = async (req, res) => {

    try {
        const { id } = req.params;

        const candidate = await findCandidateById(id)

        if (candidate === undefined || candidate === null) return res.json({ error: true, message: 'Error el candidato no existe' })

        return res.json({ error: false, candidate })
    } catch (e) {
        console.log(e.message)
        return res.json({ error: true, message: e.message })
    }
}

const putCandidate = async (req, res) => {

    try {
        const { id } = req.params;

        const requestCandidate = req.body

        const candidate = await updateCandidateById(id, requestCandidate)

        if (candidate === undefined || candidate === null) return res.json({ error: true, message: 'Error al actualizar el candidato' })

        return res.json({
            erorr: false,
            message: 'Candidato actualizado correctamente'
        });
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const postCandidate = async (req, res) => {

    const requestCandidate = req.body

    try {
        const candidate = await createCandidate(requestCandidate)

        if (candidate === undefined || candidate === null) return res.json({error: true, message: 'No se pudo crear el candidato' })

        return res.json({
            error: false,
            message: 'Candidato creado correctamente',
            candidato: candidate
        })
    } catch (e) {
        console.log(e.message)
        res.json({ error: true, message: e.message })
    }
}

const deleteCandidate = async (req, res) => {

    try {
        const { id } = req.params;

        const response = await deleteCandidateById(id)

        if(response === undefined || null) return res.json({ error: true, message: 'No se pudo eliminar el candidato'})

        return res.json({
            error: false,
            message: 'Candidato eliminado correctamente'
        })

    } catch (e) {
        console.log(e.message)
        return res.json({ error: true, message: e.message })
    }
}

export {
    getCandidate,
    getCandidates,
    putCandidate,
    postCandidate,
    deleteCandidate
}
import { Router } from "express"
const router = Router()

import { verifyToken } from '../middlewares/validateToken.js'
import { getTechnologies, postTechnologies, getTechnologyByName } from '../controllers/technologiesController.js'

router.route('/')
    .post(verifyToken, postTechnologies)
    .get(verifyToken, getTechnologies)

router.route('/:technology')
    .get(verifyToken, getTechnologyByName)

export {
    router as technologiesRoutes
}
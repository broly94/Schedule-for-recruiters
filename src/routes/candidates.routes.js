import { Router } from 'express';
const router = Router();

import { deleteCandidate, getCandidate, getCandidates, postCandidate, putCandidate } from '../controllers/candidatesController.js';
import { verifyToken } from '../middlewares/validateToken.js';


router.route('/')
    .post(verifyToken, postCandidate)
    .get(verifyToken, getCandidates)

router.route('/:id')
    .get(verifyToken, getCandidate)
    .put(verifyToken, putCandidate)
    .delete(verifyToken, deleteCandidate)

export {
    router as candidatesRoutes
}
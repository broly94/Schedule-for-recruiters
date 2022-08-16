import { Router } from 'express';
import { deleteCandidate, getCandidate, getCandidates, postCandidate, putCandidate } from '../controllers/candidatesController.js';

const router = Router();


router.route('/')
    .post(postCandidate)
    .get(getCandidates)

router.route('/:id')
    .get(getCandidate)
    .put(putCandidate)
    .delete(deleteCandidate)

export {
    router as candidatesRoutes
}
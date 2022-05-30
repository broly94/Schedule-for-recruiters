import { Router } from 'express';
import { getAtpplicant, getAtpplicants, postApplicants, putApplicant } from '../controllers/applicantsController.js';
const router = Router();


router.route('/')
    .post(postApplicants)
    .get(getAtpplicants)

router.route('/:id')
    .get(getAtpplicant)
    .put(putApplicant)

export {
    router as applicantsRoutes
}
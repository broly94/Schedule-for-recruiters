import { Router } from 'express';
import { deleteApplicant, getAtpplicant, getAtpplicants, postApplicants, putApplicant } from '../controllers/applicantsController.js';
const router = Router();


router.route('/')
    .post(postApplicants)
    .get(getAtpplicants)

router.route('/:id')
    .get(getAtpplicant)
    .put(putApplicant)
    .delete(deleteApplicant)

export {
    router as applicantsRoutes
}
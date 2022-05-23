import { Router } from 'express';
import { getAtpplicants, postApplicants } from '../controllers/applicantsController.js';
const router = Router();


router.route('/')
    .post(postApplicants)
    .get(getAtpplicants)

export {
    router as applicantsRoutes
}
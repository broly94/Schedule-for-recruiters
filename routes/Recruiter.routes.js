import { Router } from "express";
const router = Router();

import { getRecruiter, postRecruiter, putRecruiter, deleteRecruiter, getRecruiters } from '../controllers/recruiterController.js';
import { verifyToken } from '../middlewares/validateToken.js';

router
    .route('/')
    .get(verifyToken, getRecruiters)
    .post(postRecruiter)
    
    
router
    .route('/:id')
    .get(verifyToken, getRecruiter)
    .put(verifyToken, putRecruiter)
    .delete(verifyToken, deleteRecruiter)

export {
    router as recruiterRoutes
}
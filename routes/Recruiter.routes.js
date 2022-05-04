import { Router } from "express";
export const router = Router();
import  {RecuiterController} from '../controllers/recruiterController.js';
const { postRecuiter } = RecuiterController;
router
    .route('/')
    .get(postRecuiter)

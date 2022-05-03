import { Router } from "express";
export const router = Router();
import  recuiterCtrl  from '../controllers/recruiterController.js';
const { saludo } = recuiterCtrl;

router
    .route('/')
    .get(saludo)

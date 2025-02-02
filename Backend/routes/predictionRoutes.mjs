import express  from 'express';
import { predictDiabetes }  from '../controllers/predictionController.js';
import { predictHeartDisease } from '../controllers/predictHeartDisease.js';
import { predictParkinsonDisease } from '../controllers/predictParkinsonDisease.js';
import {chatController} from '../controllers/groqController.js'
import {HealthCheckup} from '../controllers/healthCheckup.js'

const router = express.Router();

router.post('/diabetes', predictDiabetes);
router.post('/heart-disease', predictHeartDisease);
router.post('/parkinsons', predictParkinsonDisease);
router.post('/chat',chatController)
router.post('/healthcheckup',HealthCheckup)



export default router;





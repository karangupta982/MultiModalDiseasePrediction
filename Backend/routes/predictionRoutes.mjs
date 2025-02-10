import express  from 'express';
import { predictDiabetes }  from '../controllers/predictionController.js';
import { predictHeartDisease } from '../controllers/predictHeartDisease.js';
import { predictParkinsonDisease } from '../controllers/predictParkinsonDisease.js';
import {chatController} from '../controllers/groqController.js'
import {HealthCheckup} from '../controllers/healthCheckup.js'
import {auth} from "../Middleware/Auth.js"

const router = express.Router();

router.post('/diabetes',auth, predictDiabetes);
router.post('/heart-disease',auth, predictHeartDisease);
router.post('/parkinsons',auth, predictParkinsonDisease);
router.post('/chat',chatController)
router.post('/healthcheckup',HealthCheckup)



export default router;





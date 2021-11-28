import { Router } from 'express'
import ConverterController from '../app/controllers/ConverterController'
const router = Router()

// Api routes
router.get('/convert/:from/:to/:amount/:date?', ConverterController.convert)

export default router;

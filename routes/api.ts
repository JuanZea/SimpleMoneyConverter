import { Router } from 'express'
import ConverterController from '../app/controllers/ConverterController'
const router = Router()

// Api routes
router.get('/convert', ConverterController.convert)

export default router;

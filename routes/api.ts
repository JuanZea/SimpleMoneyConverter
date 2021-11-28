import { Router } from 'express'
import ConverterController from '../app/controllers/ConverterController'
const router = Router()

// Api routes
router.get('/convert/:from?/:to?/:amount?/:date?', ConverterController.convert)
router.post('/multi-convert', ConverterController.multiConvert)

export default router;

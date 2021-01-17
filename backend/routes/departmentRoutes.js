import express from 'express'
import {
  deleteDepartment,
  getDepartment,
  postDepartment,
  putDepartment,
} from '../controllers/departmentController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, postDepartment).get(getDepartment)
router
  .route('/:id')
  .delete(protect, deleteDepartment)
  .put(protect, putDepartment)

export default router

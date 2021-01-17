import express from 'express'
import {
  deleteDocument,
  deleteDocumentFile,
  getDocument,
  postDocument,
  putDocumentFile,
} from '../controllers/documentController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, postDocument).get(protect, getDocument)
router.route('/:id').delete(protect, deleteDocument)
router.route('/:id/file').put(protect, putDocumentFile)
router.route('/:id/:file_id').delete(protect, deleteDocumentFile)

export default router

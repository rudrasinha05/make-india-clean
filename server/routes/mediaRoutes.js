import express from 'express';
import { uploadMedia, getMedia } from '../controllers/mediaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, uploadMedia)
  .get(getMedia);

export default router;

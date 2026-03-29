import express from 'express';
import { createDrive, getDrives, updateDriveStatus, rsvpDrive } from '../controllers/driveController.js';
import { protect, admin, organizerOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, organizerOrAdmin, createDrive)
  .get(getDrives);

router.route('/:id/status')
  .put(protect, admin, updateDriveStatus);

router.route('/:id/rsvp')
  .post(protect, rsvpDrive);

export default router;

import Drive from '../models/Drive.js';

// @desc    Create new cleaning drive
// @route   POST /api/drives
// @access  Private (Organizer/Admin)
export const createDrive = async (req, res) => {
  try {
    const { title, description, city, address, lat, lng, date, time, beforeImages, fundraisingTarget } = req.body;

    const drive = new Drive({
      organizer: req.user._id,
      title,
      description,
      city,
      location: { address, lat, lng },
      date,
      time,
      beforeImages,
      fundraisingTarget,
      status: req.user.role === 'Admin' ? 'Approved' : 'Pending'
    });

    const createdDrive = await drive.save();
    res.status(201).json(createdDrive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all active/approved drives
// @route   GET /api/drives
// @access  Public
export const getDrives = async (req, res) => {
  try {
    const { city } = req.query;
    let query = { status: 'Approved' };
    
    if (city) {
      query.city = { $regex: new RegExp(city, 'i') };
    }

    const drives = await Drive.find(query).populate('organizer', 'name email').sort('-createdAt');
    res.json(drives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve or reject drive
// @route   PUT /api/drives/:id/status
// @access  Private (Admin)
export const updateDriveStatus = async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) return res.status(404).json({ message: 'Drive not found' });

    drive.status = req.body.status || drive.status;
    const updatedDrive = await drive.save();
    
    res.json(updatedDrive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    RSVP for a drive
// @route   POST /api/drives/:id/rsvp
// @access  Private (Volunteer/Any Role)
export const rsvpDrive = async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) return res.status(404).json({ message: 'Drive not found' });

    if (drive.volunteers.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already RSVP\'d' });
    }

    drive.volunteers.push(req.user._id);
    await drive.save();

    res.json({ message: 'Successfully RSVP\'d to drive' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

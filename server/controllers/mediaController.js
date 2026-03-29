import Media from '../models/Media.js';

// @desc    Upload Media (Video or Image URL from Cloudinary)
// @route   POST /api/media
// @access  Private
export const uploadMedia = async (req, res) => {
  try {
    const { type, url, title, description, category, driveId } = req.body;

    const media = new Media({
      user: req.user._id,
      drive: driveId,
      type,
      url,
      title,
      description,
      category
    });

    const createdMedia = await media.save();
    res.status(201).json(createdMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all Media
// @route   GET /api/media
// @access  Public
export const getMedia = async (req, res) => {
  try {
    const { type, category } = req.query;
    let query = {};
    if (type) query.type = type;
    if (category) query.category = category;

    const mediaList = await Media.find(query).populate('user', 'name').sort('-createdAt');
    res.json(mediaList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

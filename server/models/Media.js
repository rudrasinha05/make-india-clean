import mongoose from 'mongoose';

const mediaSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  drive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drive',
  },
  type: {
    type: String,
    enum: ['Video', 'Image'],
    required: true
  },
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    enum: ['Awareness', 'Before/After', 'Highlight'],
    default: 'Awareness'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
}, { timestamps: true });

const Media = mongoose.model('Media', mediaSchema);
export default Media;

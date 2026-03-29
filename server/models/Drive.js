import mongoose from 'mongoose';

const driveSchema = mongoose.Schema({
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String, required: true }
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  beforeImages: [{ type: String }],
  afterImages: [{ type: String }],
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Completed'],
    default: 'Pending',
  },
  volunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  fundraisingTarget: { type: Number, default: 0 },
  amountRaised: { type: Number, default: 0 },
}, { timestamps: true });

const Drive = mongoose.model('Drive', driveSchema);
export default Drive;

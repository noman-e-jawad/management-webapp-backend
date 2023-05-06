const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  codeName: {
    type: String,
    unique: true,
    required: true,
  },
});
export default mongoose.models.Campaign ||
  mongoose.model('Campaign', campaignSchema);

// name: {
//   type: String,
//   required: true
// },
// startDate: Date,
// endDate: Date,
// budget: Number,
// notes: String,
// status: String,

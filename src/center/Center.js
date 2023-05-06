import mongoose from 'mongoose';

const CenterSchema = mongoose.Schema(
  {
    centerName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Center || mongoose.model('Center', CenterSchema);

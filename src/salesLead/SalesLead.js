import mongoose from 'mongoose';

const SalesLeadSchema = mongoose.Schema(
  {
    centerName: {
      type: String,
      require: true,
    },
    campaignName: {
      type: String,
      required: true,
    },
    agentName: {
      type: String,
      require: true,
    },
    companyName: {
      type: String,
      require: true,
    },
    contactPerson: {
      type: String,
      require: true,
    },
    companyAddress: {
      type: String,
      require: true,
    },
    zipCode: {
      type: Number,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    altPhone: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    appointmentDate: {
      type: String,
      require: true,
    },
    appointmentTime: {
      type: String,
      require: true,
    },
    activelySeeking: {
      type: [String],
      require: true,
    },
    otherActivelySeeking: {
      type: String,
    },
    currentFrequency: {
      type: [String],
      require: true,
    },
    otherCurrentFrequency: {
      type: String,
    },
    agentComments: {
      type: String,
      require: true,
    },
    officeSize: {
      type: String,
      require: true,
    },
    isStarred: {
      type: String,
      require: true,
    },
    isVerified: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SalesLead ||
  mongoose.model('Sales Lead', SalesLeadSchema);

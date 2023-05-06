import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

const { Schema } = mongoose;

// creating stuff schema
const stuffSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: String,
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

// encrypt password before saving a model
stuffSchema.pre('save', function (next) {
  const stuff = this;
  // generating hashed password
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(stuff.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      stuff.password = hash;

      // proceed to saving the model
      next();
    });
  });
});

export default mongoose.models.Stuff || mongoose.model('Stuff', stuffSchema);

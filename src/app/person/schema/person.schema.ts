import { Schema } from 'mongoose';

export const PersonSchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true },
    dob: { type: Date },
    ic: {type: String, required: true},
  },
  { autoIndex: true, timestamps: true },
);

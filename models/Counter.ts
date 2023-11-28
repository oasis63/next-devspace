// models/Counter.ts

import mongoose, { Document, Schema } from "mongoose";

export interface CounterDocument extends Document {
  _id: string;
  seq: number;
}

const counterSchema = new Schema<CounterDocument>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1 },
});

const Counter = mongoose.model<CounterDocument>("Counter", counterSchema);

export default Counter;

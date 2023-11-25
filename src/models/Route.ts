import mongoose, { Schema } from "mongoose";

const routeSchema = new Schema({
  origin: {
    type: String,
    required: [true, "Origin city is required"],
  },
  destination: {
    type: String,
    required: [true, "Destination city is required"],
  },
  departureTime: {
    type: String,
    required: [true, "Departure time is required"],
  },
  departureDate: {
    type: Date,
    default: Date.now,
    required: [true, "Departure date is required"],
  },
  tickets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

export const Route = mongoose.model("Route", routeSchema);

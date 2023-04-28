import mongoose from "mongoose";

const Event = mongoose.Schema({
  date: {
    type: String,
    required: [true, "Please add a date of event"]
  },
  time: {
    type: String,
    required: [true, "Please add a time of event"]
  },
  data: {
    name: String,
    localization: String,
    description: String,
  }
});

export const event_model = mongoose.model("admin_events", Event) ;
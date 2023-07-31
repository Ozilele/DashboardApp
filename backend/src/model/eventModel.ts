import { Schema, model } from "mongoose";
import { Event } from "../types/types.js";

const Event = new Schema<Event>({
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

export const event_model = model<Event>("admin_events", Event) ;
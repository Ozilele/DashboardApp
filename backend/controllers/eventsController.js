import { event_model as Event } from "../model/eventModel.js"

// Req. like /admin/calendar/date?currDate=30.04.2022
// Get Events For a Date

export const getEventsForDate = async (req, res) => {
  const date = req.query.currDate.toString();
  if(!date) {
    return res.status(400).json({
      message: "Invalid request query string"
    });
  }
  const events = await Event.find({ date: date });

  if(events) {
    return res.status(201).json({
      events: events,
      message: "Some events found"
    });
  } else {
    return res.status(201).json({
      message: "No events found"
    });
  }
}

export const addEventForDate = async (req, res) => {
  const { date, time, data } = req.body;
  if(!date || !time || !data) {
    return res.status(400).json({
      message: "Please add all the fields"
    });
  }
  // Creating newEvent
  const newEvent = await Event.create({
    date,
    time,
    data,
  });

  if(newEvent) {
    return res.status(201).json({
      message: "Successfully added new event"
    });
  } else {
    res.status(400).json({
      message: "Error adding new event"
    });
  }
}

// Controller for deleting an event from db

export const deleteEvent = async (req, res) => {
  const status = await Event.deleteOne({ _id: req.params.id })
  if(status) {
    return res.status(201).json({
      message: "Successfully deleted event"
    });
  } else {
    return res.status(400).json({
      message: "Error deleting an event"
    });
  }
}

export const updateEvent = (req, res) => {

}
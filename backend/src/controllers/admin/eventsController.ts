import { event_model as EventModel } from "../../model/eventModel.js";
import { Request, Response } from "express";
import { Event } from "../../types/types.js";

// Req. like /admin/calendar/date?currDate=30.04.2022
// Get Events For a Date
export const getEventsForDate = async (req : Request, res : Response) => {
  const date: string = req.query.currDate.toString();
  if(!date) {
    return res.status(400).json({
      message: "Invalid request query string"
    });
  }
  const events: Event[] = await EventModel.find({ date: date });
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

export const addEventForDate = async (req : Request, res : Response) => {
  const { date, time, data } = req.body;
  if(!date || !time || !data) {
    return res.status(400).json({
      message: "Please add all the fields"
    });
  }
  // Creating newEvent
  const newEvent : Event = await EventModel.create({
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

export const deleteEvent = async (req : Request, res : Response) => {
  const status = await EventModel.deleteOne({ _id: req.params.id })
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

export const updateEvent = (req : Request, res : Response) => {

}
// Backend/controllers/eventController.js
import * as eventModel from '../models/eventModel.js';

export const createEvent = async (req, res, next) => {
  try {
    const {
      title,
      date,
      start_time,
      duration,
      timezone,
      mode_of_event,
      organizer,
      meeting_link,
      location,
    } = req.body;

    if (!title || !date) {
      return res.status(400).json({ success: false, message: 'Title and date are required.' });
    }

    const newEvent = await eventModel.createEvent({
      title,
      date,
      start_time,
      duration,
      timezone,
      mode_of_event,
      organizer,
      meeting_link,
      location,
    });

    res.status(201).json({ success: true, message: 'Event created successfully', data: newEvent });
  } catch (err) {
    next(err);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const events = await eventModel.getAllEvents();
    res.json({ success: true, data: events });
  } catch (err) {
    next(err);
  }
};

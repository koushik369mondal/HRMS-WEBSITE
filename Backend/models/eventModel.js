// Backend/models/eventModel.js
import pool from '../db.js';

export const createEvent = async (eventData) => {
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
  } = eventData;

  const insertQuery = `
    INSERT INTO events 
      (title, date, start_time, duration, timezone, mode_of_event, organizer, meeting_link, location) 
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING *;
  `;

  const values = [
    title,
    date,
    start_time,
    duration,
    timezone,
    mode_of_event,
    organizer,
    meeting_link,
    location,
  ];

  const result = await pool.query(insertQuery, values);
  return result.rows[0];
};

export const getAllEvents = async () => {
  const result = await pool.query('SELECT * FROM events ORDER BY date DESC;');
  return result.rows;
};

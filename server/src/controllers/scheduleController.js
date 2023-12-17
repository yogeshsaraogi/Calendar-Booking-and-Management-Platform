const { v4: uuidv4 } = require("uuid");
const { db } = require("../services/database");
const { parse, format } = require("date-fns");

const formatDate = (date) => {
  const originalDate = new Date(date);
  const formatedDate = format(originalDate, "yyyy-MM-dd");
  return formatedDate;
};

const formatTime = (time) => {
  const parsedTime = parse(time, "HH:mm", new Date());
  const formatedTime = format(parsedTime, "HH:mm:ss");
  return formatedTime;
};

const formatDbTime = (time) => {
  const parsedDate = parse(time, "yyyy-MM-dd HH:mm:ss", new Date());
  const formatedTime = format(parsedDate, "HH:mm");
  return formatedTime;
};

const addSchedule = async (req, res, next) => {
  try {
    const scheduleId = uuidv4();
    const { date, time, categoryId, userId } = req.body;

    const formatedDate = formatDate(date);
    const formatedTime = formatTime(time);

    const insertQuery = `
        INSERT INTO schedules
        (id, date, time, categoryId, userId)
        VALUES ('${scheduleId}','${formatedDate}','${formatedTime}','${categoryId}','${userId}')
      `;
    db.query(insertQuery).exec((err, response) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ response });
      }
    });
  } catch (error) {
    next(error);
  }
};

const getTimeSlot = async (req, res, next) => {
  try {
    const { date } = req.body;
    const formatedDate = formatDate(date);
    const query = `SELECT DISTINCT time 
                FROM schedules 
                WHERE date = '${formatedDate}' ORDER BY time;`;
    db.query(query).exec((err, response) => {
      if (err) {
        next(err);
      } else {
        const timeSlots = response.map((row) => {
          const formatedTime = formatDbTime(row.time);
          return formatedTime;
        });
        res.status(200).json({ timeSlots });
      }
    });
  } catch (error) {
    next(error);
  }
};

const getUserSchedule = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const query = `
                    SELECT
                        c.name,
                        s.date,
                        s.time
                    FROM
                        schedules s JOIN categories c 
                    ON 
                        s.categoryId = c.id
                    WHERE
                        s.userId = '${userId}';
  `;
    db.query(query).exec((err, response) => {
      if (err) {
        next(err);
      } else {
        const userScheduleData = response.map((row) => {
          const formatedTime = formatDbTime(row.time);
          return { ...row, time: formatedTime };
        });
        res.status(200).json({ userScheduleData });
      }
    });
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const { date } = req.query;
    const formatedDate = formatDate(date);
    const query = `
                  SELECT
                    s.id AS id,
                    s.date AS date,
                    s.time AS time,
                    u.id AS userId,
                    u.email AS email,
                    u.username AS name,
                    c.name AS category
                  FROM
                    schedules s JOIN users u ON s.userId = u.id JOIN categories c 
                  ON 
                    s.categoryId = c.id;
                  WHERE
                  s.date = '${formatedDate}'
                  `;
    db.query(query).exec((err, response) => {
      if (err) {
        next(err);
      } else {
        const allBookings = response.map((row) => {
          const formatedTime = formatDbTime(row.time);
          return { ...row, time: formatedTime };
        });
        res.status(200).json({ allBookings });
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const { id, date, time, categoryId, userId } = req.body;
    const formatedDate = formatDate(date);
    const formatedTime = formatTime(time);
    const formattedDateTime = `${formatedDate} ${formatedTime}`;
    const query = `
              ALTER TABLE schedules UPDATE
                date = '${formatedDate}',
                time = _CAST('${formattedDateTime}', 'DateTime'),
                userId = '${userId}',
                categoryId = '${categoryId}'
              WHERE id = '${id}';
  `;
    db.query(query).exec((err, response) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ response });
      }
    });
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.query;
    const query = `DELETE FROM schedules WHERE id = '${id}';`;
    db.query(query).exec((err, response) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ response });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSchedule,
  getTimeSlot,
  getUserSchedule,
  getAllBookings,
  updateBooking,
  deleteBooking,
};

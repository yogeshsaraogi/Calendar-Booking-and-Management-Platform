import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Container,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "react-calendar/dist/Calendar.css";
import {
  addSchedule,
  getCategories,
  getTimeSlot,
  getUserSchedule,
} from "../../services/ApiService";
import { useAuth } from "../../context/AuthContext";

const ALL_TIME_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

const User = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const [availableTimeSlots, setAvailableTimeSlots] = useState(ALL_TIME_SLOTS);

  const [bookedAppointments, setBookedAppointments] = useState([]);

  const [categories, setCategories] = useState([]);

  const { state } = useAuth();

  const fetchGetTimeSlot = () => {
    getTimeSlot({ date: selectedDate }).then((res) => {
      const availableSlots = ALL_TIME_SLOTS.filter(
        (slot) => !res?.timeSlots.includes(slot)
      );
      setAvailableTimeSlots(availableSlots);
    });
  };

  const fetchUserScheduled = () => {
    getUserSchedule({ userId: state?.user.id }).then((res) => {
      setBookedAppointments(res.userScheduleData);
    });
  };

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res?.categories);
    });
    fetchUserScheduled();
  });

  useEffect(() => {
    fetchGetTimeSlot();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleBookAppointment = () => {
    if (selectedCategory && selectedDate && selectedTimeSlot) {
      const newAppointment = {
        name: selectedCategory.name,
        date: selectedDate,
        time: selectedTimeSlot,
      };
      const postData = {
        date: selectedDate,
        time: selectedTimeSlot,
        categoryId: selectedCategory?.id,
        userId: state.user.id,
      };
      addSchedule(postData)
        .then((res) => {
          if (res) {
            setBookedAppointments((prevAppointments) => [
              ...prevAppointments,
              newAppointment,
            ]);
            fetchGetTimeSlot();
          }
        })
        .catch((err) => {
          alert("Booking unsuccessful");
        });

      setDialogOpen(true);
    } else {
      alert("Please select category, date, and time slot before booking.");
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: 30 }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h4" align="center">
          Book Appointments
        </Typography>

        <Grid container spacing={2} style={{ marginTop: 20 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Select Date:</Typography>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={new Date()}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Select Category:</Typography>
            <div>
              {categories.map((category) => (
                <Button
                  key={category?.id}
                  variant={
                    selectedCategory?.id === category?.id
                      ? "contained"
                      : "outlined"
                  }
                  color="primary"
                  onClick={() => handleCategoryChange(category)}
                  fullWidth
                  style={{ marginBottom: 10 }}
                >
                  {category?.name}
                </Button>
              ))}
            </div>
          </Grid>
        </Grid>

        <div style={{ marginTop: 20 }}>
          <Typography variant="h6">Available Time Slots:</Typography>
          {availableTimeSlots.length > 0 ? (
            availableTimeSlots.map((timeSlot) => (
              <Button
                key={timeSlot}
                variant={
                  selectedTimeSlot === timeSlot ? "contained" : "outlined"
                }
                color="primary"
                onClick={() => handleTimeSlotSelect(timeSlot)}
                style={{ marginRight: 10, marginBottom: 10 }}
              >
                {timeSlot}
              </Button>
            ))
          ) : (
            <Typography>
              No available time slots for the selected date.
            </Typography>
          )}
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleBookAppointment}
          style={{ marginTop: 20 }}
          fullWidth
        >
          Book Appointment
        </Button>

        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Appointment Booked</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your {selectedCategory?.name} appointment on{" "}
              {selectedDate.toDateString()} at {selectedTimeSlot} has been
              booked.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <div style={{ marginTop: 20 }}>
          <Typography variant="h5">Booked Appointments:</Typography>
          <List>
            {bookedAppointments.map((appointment, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Category: ${appointment?.name}`}
                  secondary={`Date: ${new Date(
                    appointment?.date
                  ).toDateString()}, Time: ${appointment.time}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Paper>
    </Container>
  );
};

export default User;

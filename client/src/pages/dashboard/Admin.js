import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import {
  addCategory,
  deleteBooking,
  deleteCategory,
  getAllBookings,
  getCategories,
  updateBooking,
} from "../../services/ApiService";

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.categories);
    });
  }, []);

  useEffect(() => {
    getAllBookings(selectedDate).then((data) => setBookings(data.allBookings));
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleSaveEdit = (editedBooking) => {
    const { id } = categories.find((c) => c.name === editedBooking.category);
    const { name, email, category, ...updateBookingData } = {
      ...editedBooking,
      categoryId: id,
    };
    updateBooking(updateBookingData)
      .then((res) => {
        getAllBookings(selectedDate).then((data) => {
          setBookings(data.allBookings);
          handleEditDialogClose();
        });
      })
      .catch((err) => alert("Update booking unsuccessful"));
  };

  const handleDeleteBooking = (id) => {
    deleteBooking(id).then((res) => {
      if (res) {
        getAllBookings(selectedDate).then((data) =>
          setBookings(data.allBookings)
        );
      }
    });
  };

  const handleAddCategory = () => {
    if (!newCategory) return;
    addCategory(newCategory).then((res) => {
      if (res) {
        getCategories().then((resp) => {
          setCategories(resp.categories);
        });
        setNewCategory("");
      }
    });
  };

  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId).then((res) => {
      if (res) {
        getCategories().then((resp) => {
          setCategories(resp.categories);
        });
      }
    });
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>

      <TextField
        id="date-picker"
        label="Select Date"
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{new Date(booking.date).toDateString()}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>{booking.category}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(booking)} color="primary">
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteBooking(booking.id)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Typography variant="h4" p={2}>
                No bookings on this date
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Add New Category
        </Typography>
        <FormControl fullWidth>
          <TextField
            label="Category Name"
            variant="outlined"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCategory}
          sx={{ mt: 2 }}
        >
          Add Category
        </Button>
      </Box>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Manage Categories
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteCategory(category.id)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            value={selectedBooking?.date}
            onChange={(e) =>
              setSelectedBooking((prev) => ({ ...prev, date: e.target.value }))
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Time"
            type="text"
            value={selectedBooking?.time}
            onChange={(e) =>
              setSelectedBooking((prev) => ({ ...prev, time: e.target.value }))
            }
          />
          <FormControl sx={{ marginTop: "20px" }} fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={selectedBooking?.category}
              onChange={(e) =>
                setSelectedBooking((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleSaveEdit(selectedBooking)}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin;

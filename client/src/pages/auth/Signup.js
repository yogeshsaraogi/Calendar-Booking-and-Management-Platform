import React, { useState } from "react";
import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import validation from "./SignupValidation";
import axios from "axios";
import { API_URLS } from "../../url";

function Signup() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validation(values));
    await new Promise((resolve) => setTimeout(resolve, 0));
    if (!errors.username && !errors.email && !errors.password) {
      axios
        .post(API_URLS.SIGNUP, values)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          setErrors({ ...errors, username: err.response.data.error });
        });
    }
  };
  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Signup to Manager</Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2">Already a User?</Typography>
          <Link to="/login" component={RouterLink} variant="subtitle2">
            Login
          </Link>
        </Stack>
      </Stack>
      <Box>
        <form action="" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <label htmlFor="username">
                <Typography>Username</Typography>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                onChange={handleInput}
                name="username"
              />
              {errors.username && (
                <Typography variant="caption" color={"red"}>
                  {errors.username}
                </Typography>
              )}
            </Stack>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <label htmlFor="email">
                <Typography>Email</Typography>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={handleInput}
                name="email"
              />
              {errors.email && (
                <Typography variant="caption" color={"red"}>
                  {errors.email}
                </Typography>
              )}
            </Stack>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <label htmlFor="password">
                <Typography>Create password</Typography>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={handleInput}
                name="password"
              />
              {errors.password && (
                <Typography variant="caption" color={"red"}>
                  {errors.password}
                </Typography>
              )}
            </Stack>
            <Button type="submit">Sign Up</Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

export default Signup;

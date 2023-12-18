import React, { useState } from "react";
import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import validation from "./LoginValidation";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { API_URLS } from "../../url";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [values, setValues] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validation(values));
    if (!errors.username && !errors.password) {
      axios
        .post(API_URLS.LOGIN, values)
        .then((res) => {
          if (res.data.status === "Success") {
            setTimeout(() => {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("user", JSON.stringify(res.data.user));
              setAuthToken(res.data.token);
              login(res.data.user);
            }, 0);

            values.isAdmin ? navigate("/admin") : navigate("/user");
          } else {
            alert("No record existed");
          }
        })
        .catch((err) => alert("No record existed"));
    }
  };
  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
          <Typography variant="h4">Login to Manager</Typography>
          <Stack direction={"row"} spacing={0.5}>
            <Typography variant="body2">New User?</Typography>
            <Link to="/signup" component={RouterLink} variant="subtitle2">
              Create an account
            </Link>
          </Stack>
        </Stack>
        <Box>
          <form action="" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  onChange={handleInput}
                />
                {errors.username && (
                  <Typography variant="caption" color={"red"}>
                    {errors.username}
                  </Typography>
                )}
              </Stack>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleInput}
                />
                {errors.password && (
                  <Typography variant="caption" color={"red"}>
                    {errors.password}
                  </Typography>
                )}
              </Stack>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <label>
                  <input
                    type="checkbox"
                    name="isAdmin"
                    checked={values.isAdmin}
                    onChange={handleInput}
                  />
                  Log in as Admin
                </label>
              </Stack>
              <Button type="submit">Log in</Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Login;

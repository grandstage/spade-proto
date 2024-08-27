"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import {
  Alert,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";

async function getCsrfToken() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/csrf/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const csrfToken = response.headers.get("X-CSRFToken") || "";
  return csrfToken;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const StyledLogo = styled("img")(({ theme }) => ({
  margin: theme.spacing(1),
  width: "100px",
  height: "100px",
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Sending data:", formData);
      const csrfToken = await getCsrfToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken, // Include the CSRF token in the headers
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("Response status:", response.status);
      const data = await response.json();

      if (!response.ok) {
        if (data.username && data.username.length > 0 && !data.password) {
          setError(data.username[0]); 
        } else {
          setError("Registration failed");
        }
      } else {
        setError("Email successfully registered!");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed due to a server error.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <StyledLogo src="/spade-ai-logo.png" alt="Spade AI Logo" />
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          {error && (
            <Alert
              severity="error"
              style={{ width: "100%", marginBottom: "16px" }}
            >
              {error}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                label="Email address"
                type="username"
                variant="outlined"
                fullWidth
                required
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Register
          </StyledButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2" display="inline">
                Already have an account?
              </Typography>
              <Link href="/">
                <Button variant="text">Log in</Button>
              </Link>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
}

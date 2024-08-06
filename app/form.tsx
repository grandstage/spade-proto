"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
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
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
});

const StyledLogo = styled("img")({
  margin: "8px",
  width: "100px",
  height: "100px",
});

const StyledForm = styled("form")({
  width: "100%",
  marginTop: "24px",
});

const StyledButton = styled(Button)({
  margin: "24px 0 16px",
});

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Retrieve the CSRF token (You may need to adjust this based on how you store or fetch the token)
      const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
      const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') || '' : '';
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(csrfToken && { 'X-CSRFToken': csrfToken }), // Conditionally include CSRF token
      };
  
      const response = await fetch(`http://localhost:8000/api/login/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        console.log('Response Status: ', response.status)
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid username or password");
      }
    } catch (error) {
      console.error('Error:', error);
      setError("An unexpected error occurred");
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
          Login
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
          <Stack alignItems="flex-end" style={{ marginTop: 8 }}>
            <Link
              href="/forgotPassword"
              style={{
                fontSize: "0.875rem",
                color: "#000",
                textDecoration: "underline",
              }}
            >
              Forgot password?
            </Link>
          </Stack>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </StyledButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body5" display="inline">
                Don't have an account?
              </Typography>
              <Link href="/register">
                <Button variant="text">Sign up</Button>
              </Link>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
}

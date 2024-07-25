"use client";

import { useState, FormEvent } from "react";
import {
  Alert,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/auth/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Failed to send reset instructions");
      setSuccess(null);
    } else {
      setError(null);
      setSuccess(
        "Instructions to reset your password have been sent to your email."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h5">
          Forgot Your Password?
        </Typography>
        <Typography
          component="p"
          variant="body1"
          style={{ marginTop: "8px", textAlign: "center" }}
        >
          Enter your email address and we will send you instructions to reset
          your password.
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
          {success && (
            <Alert
              severity="success"
              style={{ width: "100%", marginBottom: "16px" }}
            >
              {success}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email address"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Send Reset Link
          </StyledButton>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/">
                <Button variant="text">Back to Login</Button>
              </Link>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
}

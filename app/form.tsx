"use client";

import React, { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
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
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    console.log({ response });
    if (!response?.error) {
      setError(null);
      router.push("/dashboard");
      router.refresh();
    } else {
      setError("Invalid email or password");
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
                name="email"
                label="Email address"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={formData.email}
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
              <Typography variant="body2" display="inline">
                Don&apos;t have an account?
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

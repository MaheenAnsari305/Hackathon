import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase.config";
import { setUser } from "../UserSlice"; // Redux action
import { ref, set } from "firebase/database"; // Firebase Realtime Database
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material"; // Added imports for dropdown

const Card = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  maxWidth: "450px",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(4),
  alignItems: "center",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
}));

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [subscribe, setSubscribe] = React.useState(false); 
  const [role, setRole] = React.useState("user"); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(setUser(user)); // Saving user data to Redux

          // Saving user data to Firebase Realtime Database
          set(ref(database, "users/" + user.uid), {
            name: name,
            email: email,
            role: role, 
          });

          // Redirect based on role
          if (role === "admin") {
            navigate("/login"); 
          } else {
            navigate("/login"); 
          }
        })
        .catch((error) => {
          console.error("Error signing up", error.message);
        });
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <SignUpContainer direction="column">
      <Card variant="outlined">
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            required
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} />}
            label="I want to receive updates via email"
          />
          
          {/* Role Selection Dropdown */}
          <FormControl required fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" fullWidth variant="contained">
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Button color="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>
  );
}

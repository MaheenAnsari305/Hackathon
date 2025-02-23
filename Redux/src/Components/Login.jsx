import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase.config";
import { setUser } from "../UserSlice"; // Redux action
import Snackbar from "@mui/material/Snackbar"; 
import MuiAlert from "@mui/material/Alert"; 
import { useDispatch } from "react-redux";
import { ref, get } from "firebase/database"; // To fetch user data from Firebase

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch to save user data

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted"); // Debugging

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User successfully logged in:", user); // Debugging
          dispatch(setUser(user)); // Saving user data to Redux
          
          // Fetch user role from Firebase
          const userRef = ref(database, "users/" + user.uid);
          get(userRef)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.val();
                const userRole = data.role; // Get the role from Firebase
                console.log("User role fetched:", userRole); // Debugging
                
                // Redirect based on role
                if (userRole === "admin") {
                  console.log("Redirecting to admin dashboard...");
                  navigate("/dashboard");
                } else {
                  console.log("Redirecting to user dashboard...");
                  navigate("/dashboard");
                }
              } else {
                console.log("No user data found in Firebase");
              }
            })
            .catch((error) => {
              console.error("Error fetching user role:", error);
            });

          setOpenSnackbar(true); 
          console.log("Snackbar should open"); 
        })
        .catch((error) => {
          console.error("Error logging in", error.message);
        });
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); 
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: "450px",
          padding: 4,
          boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Login
        </Typography>
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
        <Button type="submit" fullWidth variant="contained">
          Login
        </Button>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Button color="primary" onClick={() => navigate("/")}>
            Sign Up
          </Button>
        </Typography>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
}

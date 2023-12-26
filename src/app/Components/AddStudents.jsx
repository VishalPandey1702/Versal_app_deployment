"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import axios from "axios";
import { Popup, failToast, successToast } from "./SuccessPopup";

const AddStudent = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    fathername: "",
    hostelname: "",
    roomnumber: "",
    CollegeId: "",
    phonenumber: "",
    fatherPhoneNumber: "",
    password: "",
    repeatpassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Update the state with the form values
    setFormData({
      name: data.get("Name"),
      fathername: data.get("fathername"),
      hostelname: data.get("hostelname"),
      roomnumber: data.get("roomnumber"),
      CollegeId: data.get("CollegeId"),
      phonenumber: data.get("phonenumber"),
      fatherPhoneNumber: data.get("phonenumber"),
      password: data.get("password"),
      repeatpassword: data.get("repeatpassword"),
    });

    // Log the updated state with the role

    const finalData = {
      name: data.get("Name"),
      collegeId: data.get("CollegeId"),
      role: "STUDENT",
      password: data.get("password"),
    };
    try {
      const response = await axios.post("/api/user", finalData);
      if (response) {
        successToast("Account Created!");
        console.log(response);
      }
    } catch (error) {
      failToast("Something Went Wrong!");
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <header className="bg-sky-100 bg-opacity-60 self-stretch flex flex-col mb-1 pb-24 px-5 max-md:max-w-full">
          <section className="self-center w-full mt-4 max-md:max-w-full max-md:mt-2">
            <div className="flex w-full grow flex-col flex-1 mx-auto px-3 py-6 rounded-xl max-md:mt-2 bg-white text-black">
              <h2 className="text-4xl text-center mb-4">Add Students</h2>
            </div>
          </section>
          <section>
            <div>
              <Container component="main">
                <CssBaseline />
                <Box className="mt-10 flex flex-col justify-center items-center">
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography>Name</Typography>
                        <TextField
                          autoComplete="given-name"
                          name="Name"
                          required
                          fullWidth
                          id="Name"
                          label="Name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>Father Name</Typography>
                        <TextField
                          required
                          fullWidth
                          id="fathername"
                          label="Father Name"
                          name="fathername"
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography>Hostel Name</Typography>
                        <TextField
                          required
                          fullWidth
                          id="hostelname"
                          label="Hostel Name"
                          name="hostelname"
                          autoComplete="hostelname"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography>Room Number</Typography>
                        <TextField
                          required
                          fullWidth
                          name="roomnumber"
                          label="Room Number"
                          id="roomnumber"
                          autoComplete="roomnumber"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>College Id</Typography>
                        <TextField
                          required
                          fullWidth
                          name="CollegeId"
                          label="College Id"
                          id="CollegeId"
                          autoComplete="CollegeId"
                          type="email"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>Phone Number</Typography>
                        <TextField
                          required
                          fullWidth
                          name="phonenumber"
                          label="Phone Number"
                          id="phonenumber"
                          autoComplete="phonenumber"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>Father Phone Number</Typography>
                        <TextField
                          required
                          fullWidth
                          name="fatherPhoneNumber"
                          label="Father Phone Number"
                          id="fatherPhoneNumber"
                          autoComplete="fatherPhoneNumber"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>Add Password</Typography>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          id="password"
                          type="password"
                          autoComplete="password"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>Repeat Password</Typography>
                        <TextField
                          required
                          fullWidth
                          type="password"
                          name="repeatpassword"
                          label="Repeat Password"
                          id="repeatpassword"
                          autoComplete="repeatpassword"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={formData.password !== formData.repeatpassword}
                      sx={{ mt: 3, mb: 2 }}
                      className="bg-blue-700 hover:bg-blue-700 disabled:bg-blue-200"
                    >
                      Register
                    </Button>
                  </Box>
                </Box>
              </Container>
            </div>
          </section>
        </header>
      </main>
      <Popup />
    </>
  );
};

export default AddStudent;

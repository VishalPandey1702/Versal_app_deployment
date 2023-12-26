"use client";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { signIn } from "next-auth/react";

function Page() {
  // State variables to store email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Event handler for input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Log the form data to the console
    console.log(formData);
    const response = await signIn("credentials", {
      ...formData,
      callbackUrl: "http://localhost:3000/dashboard",
    });
    console.log(response);
    // Add your logic for handling form submission here (e.g., sending data to the server)
  };

  return (
    <main className="bg-white flex flex-col pl-5 pr-1.5">
      <section className="self-center flex w-full max-w-[1101px] flex-col mt-16 mb-2 max-md:max-w-full max-md:mt-10 justify-center items-center">
        <div className="flex max-w-full flex-col">
          <h1 className="text-black text-6xl max-w-[753px] max-md:max-w-full max-md:text-4xl mx-auto flex justify-center items-center">
            Quality Forum
          </h1>
        </div>
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col mt-0 max-md:mt-10">
              <img
                loading="lazy"
                src="/assets/student.png"
                alt="Student"
                className="pb-7 pt-10 block w-40 h-auto mx-auto"
              />
              <h2 className="text-black text-3xl self-center">Welcome To Quality Forum</h2>
            </div>
          </div>
        </div>
        <div className="max-w-full mt-7 max-md:mt-0">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 pb-6">
            <div className="flex flex-col items-stretch w-[380px]  max-md:w-full max-md:ml-0">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <div className="flex flex-col max-md:mt-10 gap-6 justify-center items-center">
                    <TextField
                      className="rounded border w-full"
                      name="email" // Use 'name' instead of 'id'
                      label="College ID"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <TextField
                      className="rounded border w-full"
                      name="password" // Use 'name' instead of 'id'
                      label="Password"
                      variant="outlined"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <a
                      href="/dashboard"
                      className="text-white no-underline w-full"
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        className="rounded shadow-[0px_4px_4px_0px_rgba(0,0,0,0.30)] bg-sky-700 flex w-full flex-col mt-4"
                      >
                        Sign in
                      </Button>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Page;

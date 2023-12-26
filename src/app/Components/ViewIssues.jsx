"use client";
import React, { useState } from "react";
import axios from "axios";
import { Popup, failToast, successToast } from "./SuccessPopup";

const plans = [
  {
    name: "FOOD",
  },
  {
    name: "MEDICAL",
  },
  {
    name: "WATER",
  },
  {
    name: "TOILET",
  },
  {
    name: "GYM",
  },
];

export default function ViewIssues() {
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const resolveIssue = async (plan) => {
    setLoading(true);
    try {
      // Make an API call to mark the issue as resolved
      const response = await axios.delete(`/api/raise?type=${plan.name}`);
      if (response.data.data) {
        successToast("Resolved!");
      }
      // Optionally, update the UI or perform additional actions after a successful resolution
    } catch (error) {
      // Handle API call error, if needed
      console.error("Error resolving issue:", error);
      failToast("Failed!");
    } finally {
      setLoading(false);
    }
  };

  const togglePlan = (plan) => {
    if (selectedPlans.includes(plan)) {
      setSelectedPlans(selectedPlans.filter((selected) => selected !== plan));
    } else {
      setSelectedPlans([...selectedPlans, plan]);
    }
  };

  return (
    <>
      <h1 className="flex items-center text-4xl">View Issues of Students</h1>
      <div className="grid justify-center items-center grid-cols-2 gap-4 px-4 py-10 mx-auto">
        {plans.map((plan) => (
          <React.Fragment key={plan.name}>
            <div
              className={`relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none ${
                selectedPlans.includes(plan)
                  ? "bg-red-900/75 text-white"
                  : "white"
              }`}
              onClick={() => togglePlan(plan)}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <p
                      className={`font-medium ${
                        selectedPlans.includes(plan)
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {plan.name}
                    </p>
                    {/* Description can be added here */}
                  </div>
                </div>
                {selectedPlans.includes(plan) && (
                  <div className="shrink-0 text-white"></div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => resolveIssue(plan)}
                className={`inline-flex items-center px-4 py-2 font-semibold tracking-tighter transition duration-500 ease-in-out transform bg-green-500 border rounded-lg text-md hover:text-white hover:bg-green-600 focus:shadow-outline ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Resolving..." : "Resolved"}
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
      <Popup />
    </>
  );
}

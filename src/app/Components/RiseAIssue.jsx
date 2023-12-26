"use client";
import React, { useState, useEffect } from "react";
import { Popup, failToast, successToast } from "./SuccessPopup";
import axios from "axios";

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

export default function RaiseAIssue() {
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [feedbackData, setFeedbackData] = useState({
    type: null,
    satisfied: null,
  });

  useEffect(() => {
    // Log the feedback data whenever it changes
    console.log("Feedback Data:", feedbackData);
    (async () => {
      try {
        const response = await axios.post("/api/raise", feedbackData);
        if (response) {
          successToast("Successfull");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [feedbackData]);

  const togglePlan = (plan) => {
    if (selectedPlans.includes(plan)) {
      setSelectedPlans(selectedPlans.filter((selected) => selected !== plan));
    } else {
      setSelectedPlans([...selectedPlans, plan]);
    }
  };

  const handleFeedback = (feedbackType, isSatisfied) => {
    setFeedbackData({
      type: feedbackType,
      satisfied: isSatisfied,
    });
  };

  return (
    <>
      <h1 className="flex items-center text-4xl">Share your Issues</h1>
      <div className="grid justify-center items-center grid-cols-2 gap-4 px-4 py-10 mx-auto">
        {plans.map((plan) => (
          <React.Fragment key={plan.name}>
            <div
              className={`relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none ${
                selectedPlans.includes(plan)
                  ? "bg-red-900/75 text-white"
                  : "bg-white"
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
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleFeedback(plan.name, true)}
                className="inline-flex items-center px-4 py-2 font-semibold tracking-tighter transition duration-500 ease-in-out transform bg-green-500 border rounded-lg text-md hover:text-white hover:bg-green-600 focus:shadow-outline"
              >
                Satisfied
              </button>
              <button
                onClick={() => handleFeedback(plan.name, false)}
                className="inline-flex items-center px-4 py-2 font-semibold tracking-tighter transition duration-500 ease-in-out transform bg-red-500 border rounded-lg text-md hover:text-white hover:bg-red-600 focus:shadow-outline"
              >
                Unsatisfied
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
      <Popup />
    </>
  );
}

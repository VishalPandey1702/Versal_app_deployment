"use client";
import React, { useState, useEffect } from "react";
import {
  InternetPieChart,
  LaundryPieChart,
  MessPieChart,
  SweeperPieChart,
} from "./Charts";
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

const ViewDashboard = (props) => {
  const { reviews } = props;
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [comments, setComments] = useState([]);
  const [raiseData, setRaiseData] = useState([]);

  useEffect(() => {
    // Fetch comments from the server and update the state
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/issue");
        setComments(data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();

    // Fetch raise data from the server and update the state
    const fetchRaiseData = async () => {
      try {
        const { data } = await axios.get("/api/raise");
        setRaiseData(data.data);
      } catch (error) {
        console.error("Error fetching raise data:", error);
      }
    };

    fetchRaiseData();
  }, []);

  const calculateSatisfaction = (category) => {
    const categoryData = raiseData.filter((item) => item.type === category);
    const satisfiedCount = categoryData.filter((item) => item.satisfied).length;
    const unsatisfiedCount = categoryData.filter(
      (item) => !item.satisfied
    ).length;

    return { satisfied: satisfiedCount, unsatisfied: unsatisfiedCount };
  };

  return (
    <main>
      <header className=" bg-opacity-60 self-stretch flex flex-col mb-1 pb-24 px-5 max-md:max-w-full">
        <section className="self-center w-full mt-4 max-md:max-w-full max-md:mt-2">
          <div className="gap-3 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col drop-shadow-xl items-stretch w-3/12 max-md:w-full max-md:ml-0">
              <button
                className={
                  "flex w-full grow flex-col flex-1 mx-auto px-3 py-6 rounded-xl max-md:mt-2 shadow-sm bg-white text-black transform scale-100 transition-transform"
                }
              >
                <h2 className="text-black text-2xl self-center whitespace-nowrap">
                  MESS FOOD
                </h2>
                <div className="aspect-w-16 aspect-h-9 object-contain object-center overflow-hidden self-center mt-4">
                  <p>Graph of mess food</p>
                  {reviews.length !== 0 && (
                    <MessPieChart MessData={reviews.MESS} />
                  )}
                </div>
              </button>
            </div>
            <div className="flex drop-shadow-xl flex-col items-stretch w-3/12 ml-2 max-md:w-full max-md:ml-0">
              <button
                className={
                  "flex w-full grow flex-col flex-1 mx-auto px-3 py-6 rounded-xl max-md:mt-2 shadow-sm bg-white text-black transform scale-100 transition-transform"
                }
              >
                <h2 className="text-black text-2xl self-center whitespace-nowrap">
                  SWEEPER
                </h2>
                <div className="aspect-w-16 aspect-h-9 object-contain object-center overflow-hidden self-center mt-4">
                  <p>Graph of Sweeper Servic</p>
                  {reviews.length !== 0 && (
                    <SweeperPieChart Sweeper={reviews.SWEEPER} />
                  )}
                </div>
              </button>
            </div>
            <div className="flex drop-shadow-xl flex-col items-stretch w-3/12 ml-2 max-md:w-full max-md:ml-0">
              <button
                className={
                  "flex w-full grow flex-col flex-1 mx-auto px-3 py-6 rounded-xl max-md:mt-2 shadow-sm bg-white text-black transform scale-100 transition-transform"
                }
              >
                <h2 className="text-black text-2xl self-center whitespace-nowrap">
                  LAUNDRY
                </h2>
                <div className="aspect-w-16 aspect-h-9 object-contain object-center overflow-hidden self-center mt-4">
                  <p>Graph of Laundry Service</p>
                  {reviews.length !== 0 && (
                    <LaundryPieChart LaundryData={reviews.Laundry} />
                  )}
                </div>
              </button>
            </div>
            <div className="flex flex-col drop-shadow-xl items-stretch w-3/12 ml-2 max-md:w-full max-md:ml-0">
              <button
                className={
                  "flex w-full grow flex-col flex-1 mx-auto px-3 py-6 rounded-xl max-md:mt-2 shadow-sm bg-white text-black"
                }
              >
                <h2 className="text-black text-2xl self-center whitespace-nowrap">
                  INTERNET
                </h2>
                <div className="aspect-w-16 aspect-h-9 object-contain object-center overflow-hidden self-center mt-4">
                  <p>Graph of Internet Service</p>
                  {reviews.length !== 0 && (
                    <InternetPieChart Internet={reviews.INTERNET} />
                  )}
                </div>
              </button>
            </div>
          </div>
        </section>
        <section>
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 drop-shadow-xl mt-14 max-md:max-w-full max-md:mt-10">
              <div className="max-md:w-full">
                <div className="shadow-sm bg-blue-100 flex w-full shrink-0 h-auto flex-col mx-auto rounded-xl max-md:max-w-full max-md:mt-9">
                  <div className="grid col-span-2 md:col-span-2 w-full items-start gap-4 px-4 py-6 md:py-10 mx-auto">
                    <h1 className="flex font-semibold items-center text-2xl">
                      View Issues
                    </h1>
                    {plans.map((plan) => (
                      <React.Fragment key={plan.name}>
                        <div
                          className={`relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none ${
                            selectedPlans.includes(plan)
                              ? "bg-red-900/75 text-white"
                              : "white"
                          }`}
                        >
                          <div className="flex w-full items-center">
                            <div className="text-sm">
                              <p
                                className={`font-medium ${
                                  selectedPlans.includes(plan)
                                    ? "text-white"
                                    : "text-gray-900"
                                }`}
                              >
                                <div className="flex justify-center items-center">
                                  <>{plan.name}</>
                                  <div className="flex rounded border-2 border-indigo-300/100 ml-4">
                                    <>
                                      <p className="text-green-500 p-1 ">
                                        {
                                          calculateSatisfaction(plan.name)
                                            .satisfied
                                        }
                                      </p>
                                      <p className=" text-red-500 p-1 ">
                                        {
                                          calculateSatisfaction(plan.name)
                                            .unsatisfied
                                        }
                                      </p>
                                    </>
                                  </div>
                                </div>
                              </p>
                            </div>
                            {selectedPlans.includes(plan) && (
                              <div className="shrink-0 text-white"></div>
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-grow md:mt-0">
                <div className="bg-blue-100 shadow-sm rounded-xl p-4 md:p-5">
                  <p className="text-xl font-semibold mb-3 pt-10">
                    Comments/Suggestions
                  </p>
                  <div className="flex flex-col max-h-80 overflow-y-auto ">
                    {comments.map((element, index) => (
                      <div key={index} className="mb-4">
                        <p className="text-xs text-gray-500">
                          {element.createdAt.slice(0, 10) +
                            " " +
                            element.createdAt.slice(11, 16)}
                        </p>
                        <p className="text-sm font-medium mb-1">
                          {element.type}
                        </p>
                        <p className="text-sm">{element.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        </section>
      </header>
    </main>
  );
};

export default ViewDashboard;

"use client";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { Popup, failToast, successToast } from "./SuccessPopup";
import axios from "axios";

const SweeperService = () => {
  const { data } = useSession();
  const [ratings, setRatings] = useState({
    behavior: { rating: 1, count: 0 },
    regularity: { rating: 1, count: 0 },
    cleanliness: { rating: 1, count: 0 },
  });

  const [comment, setComment] = useState("");

  const handleRatingChange = (category, newValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: {
        rating: newValue,
        count: prevRatings[category].count + 1,
      },
    }));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    const output = {
      stars: JSON.stringify({
        Behavior: ratings.behavior.rating,
        Regularity: ratings.regularity.rating,
        Cleanliness: ratings.cleanliness.rating,
      }),
      comment: comment,
      userId: data.user.id,
      type: "SWEEPER",
    };
    try {
      const response = await axios.post("/api/issue", output);
      console.log(response);
      successToast("Response Received");
    } catch (error) {
      console.error(error);
      failToast("Error");
    }
  };

  return (
    <>
      <section className="self-center w-full mt-10 max-md:max-w-full max-md:mt-8">
        <div className="flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
            <form className="border shadow-sm bg-white flex grow flex-col w-full mx-auto pt-9 pb-20 px-5 rounded-xl border-solid border-black max-md:max-w-full max-md:mt-10">
              <div className="flex w-[336px] max-w-full items-start gap-5 ml-4 self-start max-md:ml-2.5">
                <div className="self-stretch flex flex-col">
                  <h3 className="text-neutral-700 text-xl mb-4">GIVE RATING</h3>
                  {/* Behavior Rating */}
                  <div className="relative inline-block text-left">
                    <div
                      variant="contained"
                      className="mr-3 md:mb-0 border font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
                    >
                      BEHAVIOR
                      <Rating
                        name="behavior-rating"
                        value={ratings.behavior.rating}
                        onChange={(event, newValue) =>
                          handleRatingChange("behavior", newValue)
                        }
                      />
                    </div>
                  </div>

                  {/* Regularity Rating */}
                  <div className="relative inline-block text-left pt-2">
                    <div
                      variant="contained"
                      className="mr-3 md:mb-0 border font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
                    >
                      REGULARITY
                      <Rating
                        name="regularity-rating"
                        value={ratings.regularity.rating}
                        onChange={(event, newValue) =>
                          handleRatingChange("regularity", newValue)
                        }
                      />
                    </div>
                  </div>

                  {/* Cleanliness Rating */}
                  <div className="relative inline-block text-left pt-2">
                    <div
                      variant="contained"
                      color="primary"
                      className="mr-3 border md:mb-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus-visible:ring focus-visible:ring-purple-500/75"
                    >
                      CLEANLINESS
                      <Rating
                        name="cleanliness-rating"
                        value={ratings.cleanliness.rating}
                        onChange={(event, newValue) =>
                          handleRatingChange("cleanliness", newValue)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="border shadow-sm bg-white flex grow flex-col w-full mx-auto px-5 py-8 rounded-xl border-solid border-black max-md:max-w-full max-md:mt-10">
              <div className="self-center flex w-[482px] max-w-full flex-col">
                <h3 className="text-neutral-700 text-xl">
                  Comments/Suggestion
                </h3>
                <div className=" flex w-full h-auto flex-col mt-7 rounded-sm self-start max-md:max-w-full">
                  <textarea
                    className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                    rows="6"
                    placeholder="Enter your comment/suggestion here"
                    value={comment}
                    onChange={handleCommentChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          style={{
            float: "right",
            marginTop: "20px",
          }}
          variant="contained"
          onClick={handleSubmit}
          className="bg-blue-700 hover:bg-blue-700"
        >
          Submit
        </Button>
      </section>
      <Popup />
    </>
  );
};

export default SweeperService;

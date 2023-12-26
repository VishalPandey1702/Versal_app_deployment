"use client";
import React, { useEffect, useState } from "react";
import { InternetPieChart } from "./Charts";
import axios from "axios";

const SysAdminView = (props) => {
  const { reviews } = props;
  const [comments, setComments] = useState([]);
  useEffect(() => {
    // Fetch comments from the server and update the state
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/issue");
        setComments(data.data); // Assuming your server response has a 'comments' array
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, []);
  console.log(comments);
  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-col items-center max-container-width  mb-20 max-md:max-w-full max-md:my-10">
        <div className="flex w-full gap-2 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch border rounded-xl border-solid border-black w-[59%] max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-8">
              <div className=" pl-9 flex-col text-black text-3xl shadow-sm bg-white rounded-xl leading-9 relative fill-white overflow-hidden w-full items-center pr-5 pt-8 pb-10 max-md:max-w-full max-md:pb-10">
                INTERNET
                {reviews && (
                  <InternetPieChart
                    className="mt-40"
                    Internet={reviews.INTERNET}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[41%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col items-stretch  max-md:max-w-full max-md:mt-10">
              <div className="border shadow-sm bg-white flex flex-col items-stretch pl-9 pr-8 py-8 rounded-xl h-auto border-solid border-black max-md:max-w-full max-md:mt-10 max-md:px-5">
                <div className="text-neutral-700 text-xl leading-7 max-md:max-w-full h-auto">
                  Comments
                <div className="border p-6 flex shrink-0 rounded h-[590px] border-solid border-black overflow-auto flex-col mt-6 max-md:max-w-full" >
                {comments.map((element, index) => (
                  <div key={index} className="mb-4">
                    <p>
                      {element.createdAt.slice(0, 10) +
                        " " +
                        element.createdAt.slice(11, 16)}
                    </p>
                    <p>{element.type}</p>
                    <p>{element.comment}</p>
                  </div>
                ))}
                </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SysAdminView;

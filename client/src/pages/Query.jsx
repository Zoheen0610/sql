"use client";

import { useState } from "react";

export default function Query() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
      const res = await fetch("http://127.0.0.1:8000/generate-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
         const data = await res.json();
      setOutput(data.sql_query);
    } catch (err) {
      console.error(err);
      setOutput("Error connecting to backend.");
      }
      
    setInput("");
  }; 
  
  return (
    <div className="bg-white dark:bg-green-950">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            className="relative left-1/2 h-[678px] w-[1155px] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-lightgreen to-lime opacity-30 sm:left-[calc(50%-30rem)] sm:w-[1400px]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center flex flex-col items-center ">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-lime sm:text-7xl">
              QGen
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 dark:text-gray-300 sm:text-xl/8">
              Generate your sql query using natural language.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="flex flex-row gap-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type in your query..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightgreen dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="h-auto px-4 py-2 bg-lightgreen text-black rounded-lg hover:bg-lime"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full max-w-md mt-8 p-4 rounded-lg border shadow-md bg-white dark:bg-gray-900 dark:text-white">
              <h2 className="font-semibold mb-2">Output:</h2>
              <p>{output || "Your result will appear here..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

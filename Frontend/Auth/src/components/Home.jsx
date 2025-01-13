import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12">
        {/* Left Content */}
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Online Polling & Voting
          </h1>
          <p className="text-gray-600 mb-6">
          These platforms allow for greater transparency, instant results, and a more inclusive way for people to express their thoughts. <br /> Whether you're hosting a political election, a community poll, or a business survey, online polling ensures that every vote counts and provides a simple interface for users to cast their ballots from anywhere at any time.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        {/* Right Content */}
        <div>
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/983/387/non_2x/election-day-political-hand-drawn-cartoon-flat-illustration-with-voters-casting-ballots-at-polling-place-in-united-states-suitable-for-poster-or-campaign-vector.jpg"
            alt="Phone Illustration"
            className="w-72 md:w-96 mx-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;

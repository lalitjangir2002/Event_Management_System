import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css"

export const Home = () => {
  return (
    <div className="container">
      <div className="hero">
        <div className="content">
          <div className="textt">Summit Circles</div>
          <div className="content-box">
          Whatever your interest, there are thousands of people who share it at Synergy Gatherings. Events are happening every day—click the button below to join the fun</div>
        </div>
        <Link className="main-button" to="/allEvents">
          View All Events
        </Link>
      </div>

      <div className="content-box">
        <div className="content-box1">
          <div className="content-box-header">Participate in an Event</div>
          <Link className="second-button" to="/allEvents">
            All Events
          </Link>
        </div>
        <div className="content-box2">
          <div className="content-box-header">Host an Event</div>
          <Link className="second-button" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

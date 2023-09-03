import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./components/star-rating/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Test = () => {
  const [MovieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating maxRatinrg={8} setMovieRating={setMovieRating} />
      <p>rate is {MovieRating}</p>
    </div>
  );
};
root.render(
  <React.StrictMode>
    <StarRating maxRatinrg={10} />
    <Test />
    <StarRating
      maxRatinrg={5}
      // color="red"
      // size={24}
      message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      className="test"
      defaultRating={3}
    />
  </React.StrictMode>
);

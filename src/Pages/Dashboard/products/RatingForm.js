import React, { useState, useEffect } from "react";
import Rating from "react-rating-stars-component";

const AutoRatingForm = () => {
  const [rating, setRating] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(true);
  }, [rating]); 

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="container mt-5">
      <Rating
        count={5}
        value={rating}
        onChange={handleRatingChange}
        size={20}
        activeColor="#ffd700"
      />

      {showAlert && (
        <div className="alert alert-success mt-3 w-25 fn-6 height-25" role="alert">
          تم تقييم المنتج بنجاح! التقييم: {rating}
        </div>
      )}
    </div>
  );
};

export default AutoRatingForm;

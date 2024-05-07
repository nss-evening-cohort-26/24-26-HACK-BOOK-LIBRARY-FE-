/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

export default function Rating(score) {
  const [rating, setRating] = useState(score);
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          className="star"
          value={score}
          style={{
            cursor: 'pointer',
            color: rating >= star ? 'gold' : 'gray',
            fontSize: '35px',
          }}
          onClick={() => {
            setRating(star);
          }}
        >
          {' '}
          ★{' '}
        </span>
      ))}
    </div>
  );
}

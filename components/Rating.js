/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

export default function Rating() {
  const [rating, setRating] = useState(0);
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          className="star"
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

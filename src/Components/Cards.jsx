import React, { useState } from "react";
import ListCompo from "./ListCompo";

function Cards({
  maxTemp,
  minTemp,
  time,
  code,
  maxUnit,
  isLoading,
  feelsLike,
}) {
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <ul>
        {maxTemp &&
          maxTemp.map((_, i) => {
            return (
              <ListCompo
                key={i + 1}
                index={i}
                maxTemp={maxTemp}
                minTemp={minTemp}
                time={time}
                code={code}
                maxUnit={maxUnit}
                feelsLike={feelsLike}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default Cards;

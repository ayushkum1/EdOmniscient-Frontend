import React from "react";

import CountUp from "react-countup";

const Counter = (props) => {
  return (
    <div>
      <CountUp end={parseInt(props.value)} />
    </div>
  );
};

export default Counter;

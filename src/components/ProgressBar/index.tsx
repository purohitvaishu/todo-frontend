/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import CircularProgress, {
  CircularProgressProps
} from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

type Progress = {
  props?: CircularProgressProps;
  value: number;
};

const CircularProgressWithLabel: React.FC<Progress> = (
  props: CircularProgressProps & { value: number }
) => {
  const { value } = props;

  return (
    <Box
      position="relative"
      display="inline-flex"
      style={{ margin: "auto 0", marginRight: 12 }}
    >
      <CircularProgress
        variant="determinate"
        style={{ color: "lightgrey" }}
        size={30}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        style={{ position: "absolute", color: "#F76363" }}
        size={30}
        variant="determinate"
        {...props}
      />
    </Box>
  );
};

export default CircularProgressWithLabel;

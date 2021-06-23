import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressComponent = ({ progress }) => {
  return (
    <div>
      <Progress
        value={progress}
        success
        size="small"
        total="100"
        progress="percent"
      >
        {progress !== 100 ? "Uploading" : "Uploaded"}
      </Progress>
    </div>
  );
};

export default ProgressComponent;

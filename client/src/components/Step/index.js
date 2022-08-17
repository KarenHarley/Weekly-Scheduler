import { Link } from "react-router-dom";
import { formatTime } from "../../utils/utils";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
//import { CHANGE_COMPLETED } from "../../utils/mutations";
const Step = ({ data }) => {
  //   const [changeCompleted, { error, changeCompletedData }] =
  //     useMutation(CHANGE_COMPLETED);

  const ChangeCompleted = async (taskId, checked) => {
    try {
      const { updateCompleted } = await changeCompleted({
        variables: { completed: checked, _id: taskId },
      });
      return checked;
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = async (e) => {
    // const change = await ChangeCompleted(e.target.id, e.target.checked);
    // e.target.checked = change;
    console.log("Hi");
  };

  return <div>Hi</div>;
};

export default Step;

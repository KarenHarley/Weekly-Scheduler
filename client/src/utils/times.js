export const createOptions = (time) => {
  //set value to 1 in "1:00 am"
  let optionValue = time.split(":")[0];
  let optionKey = time.split(":")[0];
  //if the string has "pm" set value to 13 in  "1 pm"
  if (time.split(" ")[1] === "pm") {
    optionValue = Number(time.split(":")[0]) + 12;
    optionKey = Number(time.split(":")[0]) + 12;
  }
  // if the string has "30" set the value and key to 1.5 in "1 am"
  if (
    time.split(" ")[0].split(":")[1] === "30" &&
    time.split(" ")[1] === "am"
  ) {
    optionValue = Number(time.split(":")[0]) + 0.5;
    optionKey = Number(time.split(":")[0]) + 0.5;
  } else if (
    // if the string has "30" set the value and key to 13.5 in "1 pm"
    time.split(" ")[0].split(":")[1] === "30" &&
    time.split(" ")[1] === "pm"
  ) {
    optionValue = Number(time.split(":")[0]) + 12.5;
    optionKey = Number(time.split(":")[0]) + 12.5;
  }
  return (
    <option value={optionValue} key={optionKey}>
      {time}
    </option>
  );
};

export const formatTime = (time) => {
  console.log(parseInt(time) - 12);
  if (time.indexOf(".") == -1 && parseInt(time) <= 12) {
    return `${time}:00 am`;
  }
  if (time.split(".")[1] == "5" && parseInt(time) <= 12) {
    return `${time.split(".")[0]}:30 am`;
  }

  if (time.indexOf(".") == -1 && parseInt(time) > 12) {
    return `${parseInt(time) - 12}:00 pm`;
  }

  if (time.split(".")[1] == 5 && time > 12) {
    let splitString = time.split(".")[0];
    return `${parseInt(splitString) - 12}:30 pm`;
  }
};

export const times = [
  "1:00 am",
  "1:30 am",
  "2:00 am",
  "2:30 am",
  "3:00 am",
  "3:30 am",
  "4:00 am",
  "4:30 am",
  "5:00 am",
  "5:30 am",
  "6:00 am",
  "6:30 am",
  "7:00 am",
  "7:30 am",
  "8:00 am",
  "8:30 am",
  "9:00 am",
  "9:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "11:30 am",
  "12:00 am",
  "12:30 am",
  "1:00 pm",
  "1:30 pm",
  "2:00 pm",
  "2:30 pm",
  "3:00 pm",
  "3:30 pm",
  "4:00 pm",
  "4:30 pm",
  "5:00 pm",
  "5:30 pm",
  "6:00 pm",
  "6:30 pm",
  "7:00 pm",
  "7:30 pm",
  "8:00 pm",
  "8:30 pm",
  "9:00 pm",
  "9:30 pm",
  "10:00 pm",
  "10:30 pm",
  "11:00 pm",
  "11:30 pm",
  "12:00 pm",
];

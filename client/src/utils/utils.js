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

  //if the string has "15" set the value and key to 1.2 in "1:15 am"
  if (
    time.split(" ")[0].split(":")[1] === "15" &&
    time.split(" ")[1] === "am"
  ) {
    optionValue = Number(time.split(":")[0]) + 0.2;
    optionKey = Number(time.split(":")[0]) + 0.2;
  } else if (
    //if the string has "15" set the value and key to 1.2 in "1:15 pm"
    time.split(" ")[0].split(":")[1] === "15" &&
    time.split(" ")[1] === "pm"
  ) {
    optionValue = Number(time.split(":")[0]) + 12.2;
    optionKey = Number(time.split(":")[0]) + 12.2;
  }

  //if the string has "45" set the value and key to 1.7 in "1:45 am"
  if (
    time.split(" ")[0].split(":")[1] === "45" &&
    time.split(" ")[1] === "am"
  ) {
    optionValue = Number(time.split(":")[0]) + 0.7;
    optionKey = Number(time.split(":")[0]) + 0.7;
  } else if (
    //if the string has "45" set the value and key to 1.7 in "1:45 pm"
    time.split(" ")[0].split(":")[1] === "45" &&
    time.split(" ")[1] === "pm"
  ) {
    optionValue = Number(time.split(":")[0]) + 12.7;
    optionKey = Number(time.split(":")[0]) + 12.7;
  }
  return (
    <option value={optionValue} key={optionKey}>
      {time}
    </option>
  );
};

export const createQuadrantOptions = (quadrant) => {
  let optionValue = quadrant.split(":")[0];
  let optionKey = quadrant.split(":")[0];
  return (
    <option value={optionValue} key={optionKey}>
      {quadrant}
    </option>
  );
};

export const formatTime = (time) => {
  console.log(time);
  console.log(time.indexOf("."));
  // if it does not have a .2,.5 or .7 and it is less than 12 ( in the am) return :00
  if (time.indexOf(".") === -1 && parseInt(time) <= 12) {
    return `${time}:00 am`;
  }
  // if it has a .5 and it is less than 12 ( in the am) return :30
  if (time.split(".")[1] === "5" && parseInt(time) <= 12) {
    return `${time.split(".")[0]}:30 am`;
  }
  // if there is a .2 and it is less than 12 (in the am) return a : 15
  if (time.split(".")[1] === "2" && parseInt(time) <= 12) {
    return `${time.split(".")[0]}:15 am`;
  }
  // if there is a .7 and it is less than 12 (in the am) return a : 45
  if (time.split(".")[1] === "7" && parseInt(time) <= 12) {
    return `${time.split(".")[0]}:45 am`;
  }
  // if it does not have a .2,.5 or .7 and it is greater than 12 ( in the afternoon (pm)) return :00
  if (time.indexOf(".") === -1 && parseInt(time) > 12) {
    return `${parseInt(time) - 12}:00 pm`;
  }
  // if it has a .5 and it is greater than 12 ( in the afternoon (pm)) return :30
  if (time.split(".")[1] === "5" && time > 12) {
    let splitString = time.split(".")[0];
    return `${parseInt(splitString) - 12}:30 pm`;
  }
  // if it has a .2 and it is greater than 12 ( in the afternoon (pm)) return :15
  if (time.split(".")[1] === "2" && time > 12) {
    let splitString = time.split(".")[0];
    return `${parseInt(splitString) - 12}:15 pm`;
  }
  // if it has a .7 and it is greater than 12 ( in the afternoon (pm)) return :45
  if (time.split(".")[1] === "7" && time > 12) {
    let splitString = time.split(".")[0];
    return `${parseInt(splitString) - 12}:45 pm`;
  }
};

export const unformatTime = (time) => {};
export const shortenTimesArray = (startingTime, endingTime, timesArray) => {
  const end = formatTime(endingTime);
  const start = formatTime(startingTime);

  const newArr = timesArray.filter((time) => {
    // return (
    // );
  });
  console.log(newArr);
  return newArr;
};

export const days = [
  "Monday",
  "Tuesday",
  "Wensday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const times = [
  "1:00 am",
  "1:15 am",
  "1:30 am",
  "1:45 am",
  "2:00 am",
  "2:15 am",
  "2:30 am",
  "2:45 am",
  "3:00 am",
  "3:15 am",
  "3:30 am",
  "3:45 am",
  "4:00 am",
  "4:15 am",
  "4:30 am",
  "4:45 am",
  "5:00 am",
  "5:15 am",
  "5:30 am",
  "5:45 am",
  "6:00 am",
  "6:15 am",
  "6:30 am",
  "6:45 am",
  "7:00 am",
  "7:15 am",
  "7:30 am",
  "7:45 am",
  "8:00 am",
  "8:15 am",
  "8:30 am",
  "8:45 am",
  "9:00 am",
  "9:15 am",
  "9:30 am",
  "9:45 am",
  "10:00 am",
  "10:15 am",
  "10:30 am",
  "10:45 am",
  "11:00 am",
  "11:15 am",
  "11:30 am",
  "11:45 am",
  "12:00 am",
  "12:15 am",
  "12:30 am",
  "12:45 am",
  "1:00 pm",
  "1:15 pm",
  "1:30 pm",
  "1:45 pm",
  "2:00 pm",
  "2:15 pm",
  "2:30 pm",
  "2:45 pm",
  "3:00 pm",
  "3:15 pm",
  "3:30 pm",
  "3:45 pm",
  "4:00 pm",
  "4:15 pm",
  "4:30 pm",
  "4:45 pm",
  "5:00 pm",
  "5:15 pm",
  "5:30 pm",
  "5:45 pm",
  "6:00 pm",
  "6:15 pm",
  "6:30 pm",
  "6:45 pm",
  "7:00 pm",
  "7:15 pm",
  "7:30 pm",
  "7:45 pm",
  "8:00 pm",
  "8:15 pm",
  "8:30 pm",
  "8:45 pm",
  "9:00 pm",
  "9:15 pm",
  "9:30 pm",
  "9:45 pm",
  "10:00 pm",
  "10:15 pm",
  "10:30 pm",
  "10:45 pm",
  "11:00 pm",
  "11:15 pm",
  "11:30 pm",
  "11:45 pm",
  "12:00 pm",
];

export const quadrants = [
  "Q1: Important/Urgent",
  "Q2: Important/NOT Urgent",
  "Q3: NOT Important/Urgent",
  "Q4: NOT Important/NOT Urgent",
];

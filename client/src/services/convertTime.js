export const convertTime = timeString => {
  let year = timeString.substring(0, 4);
  let month = timeString.substring(5, 7);
  let day = timeString.substring(8, 10);
  switch (month) {
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
  }
  let appendix = "";
  switch (day) {
    case "01":
      appendix = "st";
      break;
    case "02":
      appendix = "nd";
      break;
    case "03":
      appendix = "rd";
      break;
    default:
      appendix = "th";
  }
  if (day[0] == 0) {
    day = day.substring(1, 1);
  }

  return `${month} ${day}${appendix} ${year}`;
};

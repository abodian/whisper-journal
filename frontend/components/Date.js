import React from 'react';
import { Text } from 'react-native';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const dayName = DAY_NAMES[date.getDay()];

  return `${dayName}, ${day}${getDaySuffix(day)} ${month} ${year}`;
}

const getDaySuffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

const FormattedDate = ({ date }) => {
  const formattedDate = formatDate(date);
  return <Text>{formattedDate}</Text>;
};

export default FormattedDate;

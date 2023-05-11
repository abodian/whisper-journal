import React from 'react';
import { Text } from 'react-native';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

const CustomFormattedDate = ({ date }) => {
  const [month, day, year] = date.split('-').map(Number);
  const formattedDate = new Date(year, month - 1, day);
  const dayName = DAY_NAMES[formattedDate.getDay()];
  const monthName = MONTH_NAMES[formattedDate.getMonth()];
  const ordinalSuffix = getOrdinalSuffix(day);

  return (
    <Text>{`${dayName}, ${day}${ordinalSuffix} ${monthName} ${year}`}</Text>
  );
};

export default CustomFormattedDate;


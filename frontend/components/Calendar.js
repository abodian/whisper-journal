import React, {useState} from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Icon } from 'react-native-elements';
import { useSummary } from './useSummary';
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
import { getAuth } from "firebase/auth"; //for user id 


const EntryCalendar = ({ onDayPress, selectedDate }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userID = user ? user.uid : null;
  //convert date for format accepted by sentiment analysis 
  const originalDate = selectedDate;
  const parts = originalDate.split('-');
  const convertedDate = `${parts[2]}-${parts[0]}-${parts[1]}`
  console.log("converted date", convertedDate)

  const summary = useSummary(userID, selectedDate)
  
    const renderArrow = (direction) => (
        <View style={[styles.arrow, direction === 'left' ? styles.arrowLeft : styles.arrowRight]}>
            <Icon
                name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
                type='font-awesome'
                color='#6096B4'
                size={12}
            />
        </View>
    );
    console.log('summary calendar', summary)

    let sentimentScores;
    if (summary === "Please add an entry") {
      sentimentScores = null;
    } else {
      sentimentScores = sentiment.analyze(summary).comparative;
    }
    
  console.log("sentiment score", sentimentScores)

    const getDayColor = (score) => {
        if (score >= 0.3) {
          return '#3cb371'; // green
        } else if (score >= 0.2) {
          return '#90ee90'; // light green
        } else if (score > 0) {
          return '#ffff00'; // yellow
        } else if (score == -0.1) {
          return '#bdbdbd'; // gray
        } else if (score > -0.2) {
          return '#ffa07a'; // light salmon
        } else if (score > -0.3) {
          return '#ff7f50'; // coral
        } else {
          return '#ff4e4a'; // red
        }
      };


    return (
        <Calendar
            // Customize the appearance of the calendar
            style={{
                margin: 1,
                // elevation: 5,
                borderRadius: 5,
                borderColor: 'white',
                borderWidth: 0.2,
                width: 350,

            }}
            theme={{
              backgroundColor: '#3B4252',
              calendarBackground: '#3B422',
              textSectionTitleColor: '#ffffff',
              selectedDayBackgroundColor: '#ffffff',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              todayBackgroundColor: '#ffffff',
              dayTextColor: '#ffffff',
              monthTextColor: '#6096B4'
            }}
            // Specify the current date
            // current={'2023-04-13'}
            // Callback that gets called when the user selects a day
            onDayPress={onDayPress}
            // Mark specific dates as marked
            //this belowe should be for all dates 
            // markedDates={
            //     Object.entries(sentimentScores).reduce((acc, [convertedDate, score]) => {
            //         acc[convertedDate] = {
            //             selected: true,
            //             marked: true,
            //             selectedColor: getDayColor(score),
            //         };
            //         return acc
            //     } , {})
            // }
            markedDates={{
              [convertedDate]: {
                selected: true,
                marked: true,
                selectedColor: getDayColor(sentimentScores),
              },
            }}
            // Render custom header component
            // renderHeader={renderHeader}
            // Render custom arrow component
            renderArrow={renderArrow}
            // Set the height of the calendar
            // calendarHeight={Dimensions.get('window').height * 0.5 - 100}
        />
    );
};

const styles = StyleSheet.create({
    arrow: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowLeft: {
        marginLeft: 15,
    },
    arrowRight: {
        marginRight: 15,
    },
});

export default EntryCalendar;

import React, {useState} from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Icon } from 'react-native-elements';
const Sentiment = require('sentiment');
const sentiment = new Sentiment();


const EntryCalendar = ({ onDayPress }) => {
    const [selected, setSelected] = useState('');

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
    const sentimentScores = {
        '2023-04-01': sentiment.analyze('Today was amazing! I woke up feeling refreshed and energized. The weather was perfect for a morning run, and I had a delicious breakfast. I caught up with some friends for lunch and felt grateful for their friendship. In the afternoon, I got the job I had hoped for and shared the news with loved ones. I ended the day with a delicious dinner and quality time with family. I feel so lucky to have such wonderful people in my life and to have had such an amazing day.').comparative, //date and summary hardcoded now, will need to be passed as props
        '2023-04-02': sentiment.analyze('Today was a good day. I woke up feeling rested and had a nice breakfast. Work was uneventful, but I was able to finish my tasks for the day. I met a friend for dinner after work, and we had a pleasant conversation. The weather was nice, so we walked around the park. Overall, it was a simple but enjoyable day.').comparative,
        '2023-04-07': sentiment.analyze('Today was a mix of good and bad. I woke up feeling motivated and energized, and had a great workout. Work was challenging, but I was able to handle it. However, I received some bad news in the afternoon that put a damper on my mood. I tried to shake it off by meeting some friends for dinner, but the conversation was not very uplifting. Despite the negative news, I still managed to enjoy some parts of the day.').comparative,
        '2023-04-05': sentiment.analyze('Today was a typical day. I woke up, had breakfast, and went to work. The day was uneventful and routine, but I got my work done. I had lunch with my coworkers, and then went back to work. After work, I went to the gym and had a decent workout. I came home, had dinner, and watched some TV. Overall, nothing exciting happened, but it was an okay day').comparative,
        '2023-04-04': sentiment.analyze('Today was a complete disaster. I woke up feeling exhausted and unmotivated. Work was chaotic, and I had to deal with angry customers and a difficult boss. I made a mistake that cost the company money, and I felt terrible about it. I had a terrible headache and didnt have time for lunch. After work, I got into a fender-bender on the way home, and it was my fault. I had to deal with insurance and police reports. I felt hopeless and helpless, and I cried myself to sleep.').comparative,
        '2023-04-03': sentiment.analyze('Today was absolutely incredible! I woke up feeling grateful and content, and everything just fell into place. I had a fantastic workout and a delicious breakfast. Work was a breeze, and I received some amazing news - I got a promotion! I celebrated with some friends after work, and we had a blast. The weather was perfect, and I ended the day with a beautiful sunset walk. I am so incredibly happy and blessed, and I know that today was one of the best days of my life').comparative,
        '2023-04-06': sentiment.analyze('Today was a terrible day. I woke up feeling tired and unmotivated. Work was stressful and frustrating, and I had a lot of problems to deal with. I didnt have time for lunch, and I was starving by the end of the day. After work, I got stuck in traffic and arrived home late. I burned dinner, and ended up ordering takeout. I felt guilty about not eating healthy. I didnt have energy to do anything, and just watched TV until it was time to sleep. Today was a complete waste of a day').comparative,
        '2023-04-08': sentiment.analyze('Today was a rough day. I woke up feeling anxious and had a hard time getting out of bed. Work was busy and stressful, and I had to deal with some difficult customers. I didnt have time for lunch, and ended up eating a quick sandwich at my desk. After work, I went to the grocery store and had to deal with a long line. Despite the challenges, I was able to get through the day and made it home safely.').comparative,
        '2023-04-10': sentiment.analyze('Today started off horribly, but ended up being a good day. I woke up feeling sick and had to call in sick to work. I felt guilty for missing a day, but I knew I needed rest. However, as the day went on, I started feeling better. I caught up on some TV shows and did some light cleaning around the house. In the afternoon, a friend came over to check on me and brought some soup. We had a great chat, and it was nice to have some company. Despite feeling ill, I still managed to find some joy in the day.').comparative,
    };

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
              calendarBackground: '3B4252',
              textSectionTitleColor: '#ffffff',
              selectedDayBackgroundColor: '##ffffff',
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
            markedDates={
                Object.entries(sentimentScores).reduce((acc, [date, score]) => {
                    acc[date] = {
                        selected: true,
                        marked: true,
                        selectedColor: getDayColor(score),
                    };
                    return acc
                } , {})
            }
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

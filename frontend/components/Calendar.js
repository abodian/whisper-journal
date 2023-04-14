import React, {useState} from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Icon } from 'react-native-elements';

const EntryCalendar = ({ onDayPress }) => {
    const [selected, setSelected] = useState('');

    const renderArrow = (direction) => (
        <View style={[styles.arrow, direction === 'left' ? styles.arrowLeft : styles.arrowRight]}>
            <Icon
                name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
                type='font-awesome'
                color='black'
                size={12}
            />
        </View>
    );


    return (
        <Calendar
            // Customize the appearance of the calendar
            style={{
                margin: 1,
                elevation: 5,
                borderRadius: 5,
                width: 350
            }}
            // Specify the current date
            // current={'2023-04-13'}
            // Callback that gets called when the user selects a day
            onDayPress={onDayPress}
            // Mark specific dates as marked
            markedDates={{
                '2023-04-01': {selected: true, marked: true, selectedColor: 'green'},
                '2023-04-02': {selected: true, marked: true, selectedColor: 'red'},
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

import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const AddEntry = ({ selectedDate, setSelectedDate }) => {
    const [title, setTitle] = useState('');
    const [input, setInput] = useState('');
 

    const handleAddEntry = () => {
    const data = {
        title: title,
        input: input,
        date: selectedDate,
    };

    fetch('https://whisper-journal1.onrender.com/entry', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
        // handle successful response from server
        console.log('Entry created successfully!');
        setTitle('');
        setInput('');
        setSelectedDate('');
    })
        .catch((error) => {
        // handle error
        console.log('Error creating entry.');
        console.error(error);
    });
};

    return (
    <View>
        <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        />
        <TextInput
        placeholder="Input"
        value={input}
        onChangeText={(text) => setInput(text)}
        />
        <Button title="Add Entry" onPress={handleAddEntry} />
    </View>
);
};

export default AddEntry;

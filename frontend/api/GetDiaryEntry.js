import React from 'react';
import { getAuth } from "firebase/auth"; //for user id 




 const auth = getAuth(); //get user's id    
const user = auth.currentUser; 
const userID =  user.uid; // save user's id to variable for api call




const GetDiaryEntry = ({ selectedDate }) => {
    const _id = `${userID}_${selectedDate}`
    
  fetch(`http://localhost:3001/entry/${_id}`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error retrieving entry.');
        }
    })
    .then((data) => {
        console.log(data);
        
    })
    .catch((error) => {
        console.log('Error retrieving entry.');
        console.error(error);
    });

}

export default GetDiaryEntry
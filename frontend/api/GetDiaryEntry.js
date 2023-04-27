import React from 'react';

const _id = "6442bd8c94853da5a4daa085_2023-04-27T08:00:00.000Z"
const GetDiaryEntry = () => {
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
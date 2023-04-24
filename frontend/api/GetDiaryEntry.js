import React from 'react';

const GetDiaryEntry = () => {
  fetch('https://whisper-journal1.onrender.com/entry', {
    method: 'GET',
  })

}

export default GetDiaryEntry
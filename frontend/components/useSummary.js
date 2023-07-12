// Custom hook for getting summary

import React, { useState } from 'react'
import { useEffect } from 'react';
import { getAuth } from "firebase/auth"; //for user id 

export const useSummary = (userID, selectedDate) => {
    const [summary, setSummary] = useState('');
  
    useEffect(() => {
      const fetchSummary = async () => {
        if (!userID) {
          console.log('User ID is not available');
          return;
        }
  
        const _id = `${userID}_${selectedDate}`;
  
        try {
          const response = await fetch(`https://whisper-journal1.onrender.com/summary/${_id}`);
  
          if (response.ok) {
            const data = await response.json();
            console.log('data', data)
            setSummary(data.summary);
          } else {
            setSummary('Please add an entry')
          }
        } catch (error) {
          console.error('Error fetching data', error);
        }
      }
  
      fetchSummary();
    }, [selectedDate, userID]);
  
    return summary;
  }
  
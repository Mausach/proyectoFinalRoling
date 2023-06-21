import React from 'react'
import { useLocation } from 'react-router-dom';

export const HomePage = () => {
  const location = useLocation();
  const datos = location.state;//recibe el email del loguin
  
  return (
    <div className='text-white'>
      
      HomePage {datos};
      
      </div>
  )
}

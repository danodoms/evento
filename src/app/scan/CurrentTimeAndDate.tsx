import { TriangleAlert } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const CurrentTimeAndDate = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date: any) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date: any) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className="flex items-center justify-between w-full flex-auto">



      <h2 className='p-3 bg-destructive rounded-md text-xs font-semibold flex gap-1 items-center animate-pulse'>
        <TriangleAlert className='size-3' />
        Ensure date and time is correct
      </h2>

      <div className='flex flex-col'>
        <p className='font-bold text-right tracking-wide'>{formatTime(currentDateTime)}</p>
        <p className='font-semibold text-xs text-right'>{formatDate(currentDateTime)}</p>
      </div>


    </div>
  );
};

export default CurrentTimeAndDate;
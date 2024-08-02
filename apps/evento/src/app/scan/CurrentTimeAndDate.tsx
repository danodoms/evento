import { Expand, Maximize, Minimize, Shrink, TriangleAlert } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import useNavStore from "@/store/useNavStore";

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


  // const [isFullScreen, setIsFullScreen] = useState<boolean>(false)

  const { isNavHidden, setIsNavHidden } = useNavStore();



  return (
    <div className="flex items-center justify-end w-full flex-auto gap-2 ">



      {/* <h2 className='p-3 bg-destructive rounded-md text-xs font-semibold flex gap-1 items-center animate-pulse'>
        <TriangleAlert className='size-3' />
        Ensure date and time is correct
      </h2> */}

      <div className='flex flex-col font-bold'>
        <p className='font-semibold text-right text-xs tracking-wider'>{formatTime(currentDateTime)}</p>
        <p className='font-semibold text-xs text-right'>{String(formatDate(currentDateTime)).toUpperCase()}</p>
      </div>

      {/* <div className='bg-primary w-1 h-7 rounded-full' /> */}


      <div className=' size-1 rounded-full relative m-3 ' onClick={() => setIsNavHidden(!isNavHidden)}>

        {isNavHidden ? <div className="rounded-md absolute center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <Shrink className="size-8" />
        </div> : <div className="rounded-md absolute center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <Expand className="size-8" />
        </div>}



      </div>




    </div>
  );
};

export default CurrentTimeAndDate;
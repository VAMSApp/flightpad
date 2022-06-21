import { useState, useEffect } from 'react';
import moment from 'moment'

export function Clock({ format = 'yyyy-MM-DDTH:m:ss', locale, hour12, }){

  const [date, setDate] = useState(moment().format(format));

  useEffect(() => {
    function getCurrentTime() {
      let time = moment().format(format)

      return time;
    }

    const timerId = setInterval(() => setDate(getCurrentTime()), 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
    
  }, [format]);
  
  return (
    <span>
      {date}
    </span>
  );
}

export default Clock;
import { useState, useEffect } from "react";
import isOnline from "is-online";

const useOnlineStatus = (checkInterval = 5000) => {
  const [isOnlineStatus, setIsOnlineStatus] = useState(true);

  useEffect(() => {
    const checkOnlineStatus = async () => {
      const onlineStatus = await isOnline();
      setIsOnlineStatus(onlineStatus);
    };

    checkOnlineStatus();

    const intervalId = setInterval(checkOnlineStatus, checkInterval);

    return () => clearInterval(intervalId);
  }, [checkInterval]);

  return isOnlineStatus;
};

export default useOnlineStatus;

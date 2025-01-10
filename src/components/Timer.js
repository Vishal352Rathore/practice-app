import React from 'react'

const Timer = () => {
    const [timer, setTimer] = useState(10)

  useEffect(() => {

    let intervalId;
  
    if (timer > 0) {
      intervalId = setInterval(function() {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } 
  
    return () => clearInterval(intervalId);
  }, [timer])


  return (
    <div>
      {timer}
    </div>
  )
}

export default Timer

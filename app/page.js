'use client'
import React, { useRef, useState } from 'react'

function Home() {

  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const startHandler = () => {
    if (intervalRef.current === 0) {
      startTime.current = Date.now() - currentTime;
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now() - startTime.current);
      }, 10);
    }
  };

  const stopHandler = () => {
    if (intervalRef.current !== 0) {
      clearInterval(intervalRef.current);
      intervalRef.current = 0;
    }
  };

  const lapHandler = () => {
    setLaps(prevLaps => [...prevLaps, currentTime]);
  };

  const resetHandler = () => {
    stopHandler();
    setCurrentTime(0);
    setLaps([]);
  };

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>Stopwatch Time</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={startHandler}>START</button>
          <button className="stop-btn" onClick={stopHandler}>STOP</button>
          <button className="lap-btn" onClick={lapHandler}>LAP</button>
          <button className="reset-btn" onClick={resetHandler}>RESET</button>
        </section>
      </section>
      <section className='lap-section'>
        <h2>Laps</h2>
        <section className='laps'>
          <p>lap</p>
          {laps.map((lapTime, index) => (
            <p key={index}>{(lapTime / 1000).toFixed(3)}</p>
          ))}
          <p>lap</p>
          <p>lap</p>
        </section>
      </section>
    </div>
  )
}

export default Home

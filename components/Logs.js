import React, { useEffect, useRef } from 'react';

function Logs({ logs }) {
  const logContainerRef = useRef(null);

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div ref={logContainerRef} style={{
      marginTop: '20px', 
      border: '1px solid black', 
      width: '300px', 
      height: '150px', 
      overflowY: 'auto', 
      padding: '10px', 
      backgroundColor: '#23272a',
      color: 'white'
    }}>
      {logs.map((log, index) => (
        <p key={index} style={{ fontFamily: 'monospace', fontSize: '12px', margin: '5px 0' }}>
          {log}
        </p>
      ))}
    </div>
  );
}

export default Logs;

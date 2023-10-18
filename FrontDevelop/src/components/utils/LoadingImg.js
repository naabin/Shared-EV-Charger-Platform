import React, { useEffect, useState } from 'react';
import loadimg from "../../matirial/Image/loading.gif"
import '../../styles/CoverPage/Loading.css';

function MyComponent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    setLoading(true);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`${loading ? 'loading-container' : 'hide '}`}>
        <h2 style={{}}>Ready to Start Your Jounery?</h2>
      <img src={loadimg}alt="Loading" style={{ width: '300px', height: '250px' }} />
      <p>Loading EV Shared Charger..</p>
    </div>
  );
}

export default MyComponent;






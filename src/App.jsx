import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ActivityFeed from './components/ActivityFeed.js';
import Header from './Header.jsx';
import Footer from './components/Footer.js';
import axios from 'axios';
const App = () => {
  const [callLists, setCallLists] = useState([]);
  const [archivedCallLists, setArchivedCallLists] = useState([]);
  const [presentState, setPresentState] = useState('CURRENT');
  const API_URL = '/api/activities';

  const getCallListsData = () => {
    axios
      .get(API_URL)
      .then((res) => {
        console.log(res.data); 
        setCallLists(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(callLists);
  };

  const getArchivedCallListsData = () => {
    axios
      .get(API_URL)
      .then((res) => {
        const archivedData = res.data.filter((call) => {
          call.is_archived;
        });
        setArchivedCallLists(archivedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCallListsData(), getArchivedCallListsData();
  }, []);

  return (
    <div className="container">
      <Header presentState={presentState} setPresentState={setPresentState} />
      <div className="container-view">
        {presentState === 'CURRENT' && (
          <ActivityFeed
            callLists={callLists}
            setCallLists={setCallLists}
            archivedCallLists={archivedCallLists}
            setArchivedCallLists={setArchivedCallLists}
            presentState={presentState}
            setPresentState={setPresentState}
          />
        )}
        {presentState === 'ARCHIVE' && (
          <ActivityFeed
            callLists={callLists}
            setCallLists={setCallLists}
            archivedCallLists={archivedCallLists}
            setArchivedCallLists={setArchivedCallLists}
            presentState={presentState}
            setPresentState={setPresentState}
          />
        )}
      </div>

      <Footer presentState={presentState} setPresentState={setPresentState} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
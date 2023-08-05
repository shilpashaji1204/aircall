import React, { useState } from 'react';
import ActivityFeedItems from './ActivityFeedItems';
import ActivityDetail from './ActivityDetail';
import '../css/ActivityFeed.css';

const ActivityFeed = (props) => {
  const {
    callLists,
    setCallLists,
    archivedCallLists,
    setArchivedCallLists,
    presentState,
    setPresentState,
  } = props;

  const [selectedCall, setSelectedCall] = useState(null);

  const handleCallItemClick = (call) => {
    setSelectedCall(call);
  };

  const handleArchiveAll = () => {

  };

  return (
    <div className="call-list">
      {presentState === 'CURRENT' && (
        <strong>
          <h1>Call log</h1>
        </strong>
      )}
      {presentState === 'ARCHIVE' && (
        <strong>
          <h1>Archived Calls</h1>
        </strong>
      )}
      <div className="call-list-items">
        {presentState === 'CURRENT' &&
          callLists.map((call) => {
            return (
              <ActivityFeedItems
                key={call.id}
                call={call}
                callLists={callLists}
                setCallLists={setCallLists}
                archivedCallLists={archivedCallLists}
                setArchivedCallLists={setArchivedCallLists}
                presentState={presentState}
                setPresentState={setPresentState}
                setSelectedCall={handleCallItemClick} 
              />
            );
          })}
        {presentState === 'ARCHIVE' &&
          archivedCallLists.map((call) => {
            return (
              <ActivityFeedItems
                key={call.id}
                call={call}
                callLists={callLists}
                setCallLists={setCallLists}
                archivedCallLists={archivedCallLists}
                setArchivedCallLists={setArchivedCallLists}
                presentState={presentState}
                setPresentState={setPresentState}
                setSelectedCall={setSelectedCall}
              />
            );
          })}
      </div>
      <div>
        {selectedCall && <ActivityDetail selectedCall={selectedCall} />}
      </div>
      {presentState === 'CURRENT' && (
        <button onClick={handleArchiveAll}>Archive All Calls</button>
      )}
    </div>
  );
};

export default ActivityFeed;

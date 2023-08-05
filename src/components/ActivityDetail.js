import React from 'react';
import dateFormat from 'dateformat';

const ActivityDetail = ({ selectedCall }) => {
  if (!selectedCall) {
    return null;
  }

  return (
    <div className="activity-detail">
      <h2>{selectedCall.from}</h2>
      <p>Direction: {selectedCall.direction}</p>
      <p>Type: {selectedCall.call_type}</p>
      <p>Via: {selectedCall.via}</p>
      <p>Created At: {dateFormat(selectedCall.created_at, 'mmm dS, yyyy h:MM:ss TT')}</p>
      <p>Duration: {selectedCall.duration} seconds</p>
      <p>Is Archived: {selectedCall.is_archived ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default ActivityDetail;

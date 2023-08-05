import React from 'react';
import '../css/ActivityFeedItems.css';
import { FiPhoneIncoming, FiPhoneOutgoing } from 'react-icons/fi';
import axios from 'axios';
import { BsArchive } from 'react-icons/bs';
import { MdOutlineUnarchive, MdVoicemail } from 'react-icons/md';
import dateFormat from 'dateformat';

const ActivityFeedItems = (props) => {
  const {
    callLists,
    call,
    setCallLists,
    archivedCallLists,
    setArchivedCallLists,
    presentState,
    setPresentState,
    setSelectedCall,
  } = props;

  const handleArchiveCalls = () => {
    axios
      .post(`https://aircall-job.herokuapp.com/activities/${call.id}`, {
        is_archived: !call.is_archived,
      })
      .then((res) => {
        if (callLists) {
          setCallLists(callLists.filter((c) => c.id !== res.data.id));
          setArchivedCallLists([...archivedCallLists, call]);
        } else {
          setCallLists([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnarchiveCalls = () => {
    axios
      .post(`https://aircall-job.herokuapp.com/activities/${call.id}`, {
        is_archived: call.is_archived ? !call.is_archived : call.is_archived,
      })
      .then((res) => {
        if (archivedCallLists) {
          setArchivedCallLists(
            archivedCallLists.filter((c) => c.id !== res.data.id)
          );
        } else {
          setArchivedCallLists([]);
        }
        setCallLists([...callLists, call]);
        setPresentState('ARCHIVE');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="caller-info-items">
      <div className="activity-feed-items" 
      onClick={() => setSelectedCall(call)} // Use the function here
      >
        <div className="icons-callerInfo">
          <div className="icons">
            <p>
              {call.direction === 'inbound' &&
                call.call_type === 'answered' && (
                  <FiPhoneIncoming size={20} color={'green'} />
                )}
            </p>
            <p>
              {call.direction === 'outbound' && call.call_type === 'missed' && (
                <FiPhoneOutgoing size={20} color={'red'} />
              )}
            </p>
            <p>
              {call.direction === 'inbound' &&
                call.call_type === 'voicemail' && (
                  <MdVoicemail size={20} color={'#00264c'} />
                )}
            </p>
          </div>
          <div className="call-info">
            <p>
              <strong>{call.from}</strong> <i> ({call.call_type})</i>
            </p>
            <p>
              called via <strong>{call.via}</strong>
            </p>
          </div>
        </div>
        <div className="status-icon">
          <p className="status-time">
            <strong>{dateFormat(call.created_at, 'mmmm dS, yyyy')}</strong>
          </p>
          {presentState === 'CURRENT' && (
            <BsArchive size={20} onClick={() => handleArchiveCalls()} />
          )}
          {presentState === 'ARCHIVE' && (
            <MdOutlineUnarchive
              size={20}
              onClick={() => {
                handleUnarchiveCalls();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeedItems;
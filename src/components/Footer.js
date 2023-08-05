import React from 'react';
import '../css/footer.css';
import { RiHome2Fill } from 'react-icons/ri';
import { BsArchiveFill } from 'react-icons/bs';
const Footer = (props) => {
  const { presentState, setPresentState } = props;
  return (
    <footer>
      <div className="footer-icon">
        <div
          className="footer-call-list"
          onClick={() => setPresentState('CURRENT')}
        >
          {presentState === 'CURRENT' ? (
            <RiHome2Fill size={30} color={'green'} />
          ) : (
            <RiHome2Fill size={30} color={'grey'} />
          )}
        </div>
        <div
          className="footer-archived-list"
          onClick={() => setPresentState('ARCHIVE')}
        >
          {presentState === 'ARCHIVE' ? (
            <BsArchiveFill size={30} color={'green'} />
          ) : (
            <BsArchiveFill size={30} color={'grey'} />
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
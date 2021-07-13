import React from 'react';
import './Message.sass';

// Redux
import { useSelector } from 'react-redux';

const Message = () => {
  const { message, status, show } = useSelector((state: any) => state.message);

  return (
    <div
      className={`message ${show && 'message-on'} ${
        status === 'success' && 'message-success'
      } ${status === 'failure' && 'message-failure'}`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Message;

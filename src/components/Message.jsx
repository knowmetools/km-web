import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';


const MessageBox = styled.div`
  background: ${props => props.theme.colors.error};
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  margin: .5em 0;
  padding: .5em;
`;


const MessageList = styled.ul`
  list-style: disc outside;
  padding-left: 1.5em;
`;


const Message = ({ messages }) => {
  if (messages.length === 0) {
    return null;
  }

  if (messages.length === 1) {
    return (
      <MessageBox>
        <p>{messages[0]}</p>
      </MessageBox>
    );
  }

  return (
    <MessageBox>
      <MessageList>
        {messages.map(m => <li key={m}>{m}</li>)}
      </MessageList>
    </MessageBox>
  );
};

Message.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default Message;

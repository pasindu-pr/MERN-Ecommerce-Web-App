import React from "react";
import { Message } from "semantic-ui-react";

const MessageComponent = ({ header, content }) => {
  return (
    <>
      <Message size="tiny" info>
        <Message.Header>{header}</Message.Header>
        <p>{content}</p>
      </Message>
    </>
  );
};

export default MessageComponent;

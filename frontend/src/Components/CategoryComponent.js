import React from "react";
import { Card, Image } from "semantic-ui-react";

const CategoryComponent = ({ name, image, description }) => {
  return (
    <>
      <Card className="centered" color="orange">
        <Image src={image} ui={false} size="small" wrapped />
        <Card.Content>
          <Card.Header>{name}</Card.Header>

          <Card.Description>{description}</Card.Description>
        </Card.Content>
      </Card>
    </>
  );
};

export default CategoryComponent;

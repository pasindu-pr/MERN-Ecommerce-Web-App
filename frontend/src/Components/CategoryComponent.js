import React from "react";
import { Card, Image } from "semantic-ui-react";
import styled from "styled-components";

const CategoryComponent = ({ name, image, description }) => {
  return (
    <>
      <CategoryContainer>
        <Card className="centered" color="orange">
          <Image src={image} ui={false} size="small" wrapped />
          <Card.Content>
            <Card.Header>{name}</Card.Header>

            <Card.Description>{description}</Card.Description>
          </Card.Content>
        </Card>
      </CategoryContainer>
    </>
  );
};

const CategoryContainer = styled.div`
  @media only screen and (max-width: 720px) {
    .card {
      width: 200px;
      height: 280px;
    }
  }
`;

export default CategoryComponent;

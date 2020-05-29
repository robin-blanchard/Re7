import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FaStopwatch } from "react-icons/fa";
import { WiDaySunny, WiCloudy, WiThunderstorm } from "react-icons/wi";

import "../image-center-crop.css";

function RecipeCard(props) {
  return (
    <Card>
      <div className="image-ccrop-container">
        <Card.Img
          variant="top"
          src={props.item.photo}
          className="image-ccrop"
        />
      </div>

      <Card.Body>
        <Card.Title className="text-center">{props.item.name}</Card.Title>
        <Row>
          <Col className="text-center">
            <FaStopwatch size={32} />
            <br />
            {props.item.total_time}
          </Col>
          <Col className="text-center">
            {props.item.difficulty === "1" ? (
              <WiDaySunny size={45} />
            ) : props.item.difficulty === "2" ? (
              <WiCloudy size={45} />
            ) : (
              <WiThunderstorm size={45} />
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;

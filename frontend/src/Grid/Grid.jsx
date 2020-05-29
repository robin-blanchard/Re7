import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Grid(props) {
  const items = props.items;
  const rows = [];
  const Card = props.cardComponent;

  for (var i = 0; i < Math.ceil(items.length / 3); i++) {
    const cols = [];
    const limit =
      i + 1 === Math.ceil(items.length / 3) && items.length % 3 !== 0
        ? items.length % 3
        : 3;
    for (var j = 0; j < limit; j++) {
      cols.push(
        <Col md={4} key={3 * i + j}>
          <Link
            to={`/recipes/${items[3 * i + j].id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Card key={3 * i + j} item={items[3 * i + j]} />
          </Link>
        </Col>
      );
    }
    rows.push(
      <Row key={i} className="mt-4">
        {cols}
      </Row>
    );
  }
  return <Container>{rows}</Container>;
}

export default Grid;

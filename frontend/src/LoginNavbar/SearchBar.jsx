import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("Recettes");
  const [searchResults, setSearchResults] = useState([1, 2, 3, 4]);
  return (
    <Form
      inline
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <InputGroup>
        <DropdownButton
          as={InputGroup.Prepend}
          title={searchCategory}
          variant="secondary"
        >
          {["Recettes", "Utilisateurs"].map((item, idx) => (
            <Dropdown.Item
              key={idx}
              onClick={() => {
                setSearchCategory(item);
              }}
            >
              {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <OverlayTrigger
          trigger="focus"
          placement="bottom"
          overlay={
            <Popover>
              <Popover.Content>
                <ListGroup>
                  <ListGroup.Item variant="dark">
                    {searchCategory}
                  </ListGroup.Item>
                  {searchResults.map((item, idx) => (
                    <ListGroup.Item key={idx}>{item}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Popover.Content>
            </Popover>
          }
        >
          <Form.Control
            placeholder="Rechercher"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </OverlayTrigger>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;

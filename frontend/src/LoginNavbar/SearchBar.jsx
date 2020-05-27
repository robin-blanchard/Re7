import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { axiosInstanceNoAuth } from "../axiosApi";

import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("Recettes");
  const [searchResults, setSearchResults] = useState([1, 2, 3, 4]);

  useEffect(() => {
    if (search === "") {
      setSearchResults([]);
      return;
    }

    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();

    const url =
      "api/search/recipes".repeat(searchCategory === "Recettes") +
      "auth/users".repeat(searchCategory === "Utilisateurs");
    const urlSearch = url + "?search=" + search + "&limit=5";

    axiosInstanceNoAuth
      .get(urlSearch)
      .then((response) => {
        setSearchResults(Array(...response.data.results));
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      source.cancel();
    };
  }, [search, searchCategory]);
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
          show={false}
          overlay={
            searchResults.length > 0 ? (
              <Popover>
                <ListGroup>
                  {searchResults.map(function (item, idx) {
                    if (searchCategory === "Recettes") {
                      return (
                        <Link key={idx} to={"/recipes/" + item.id}>
                          <ListGroup.Item>{item.name}</ListGroup.Item>
                        </Link>
                      );
                    } else if (searchCategory === "Utilisateurs") {
                      return (
                        <Link key={idx} to={"/profile/" + item.username}>
                          <ListGroup.Item>{item.username}</ListGroup.Item>
                        </Link>
                      );
                    } else {
                      return <></>;
                    }
                  })}
                </ListGroup>
              </Popover>
            ) : (
              <Popover>
                <Popover.Content>Aucun résultat</Popover.Content>
              </Popover>
            )
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

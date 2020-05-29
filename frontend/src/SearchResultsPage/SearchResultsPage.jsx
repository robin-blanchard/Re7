import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import { axiosInstanceNoAuth } from "../axiosApi";
import InfiniteScroll from "../Grid/InifiniteScroll";
import Grid from "../Grid/Grid";
import RecipeCard from "../RecipeCard/RecipeCard";

const SearchResultsPage = () => {
  const data = useLocation();

  const [search, setSearch] = useState(data.state ? data.state.search : "");
  const [searchCategory, setSearchCategory] = useState(
    data.state ? data.state.searchCategory : "Recettes"
  );
  const [urlSearch, setUrlSearch] = useState("");

  useEffect(() => {
    const url =
      "api/recipes".repeat(searchCategory === "Recettes") +
      "auth/users".repeat(searchCategory === "Utilisateurs");
    setUrlSearch(url + ("?search=" + search).repeat(search !== ""));
  }, [search, searchCategory]);

  return (
    <Fragment>
      <br />
      <Form>
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

          <Form.Control
            placeholder="Rechercher"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </InputGroup>
      </Form>
      <hr />
      <InfiniteScroll
        componentToScroll={Grid}
        cardComponent={RecipeCard}
        axiosInstance={axiosInstanceNoAuth}
        limit={6}
        url={urlSearch}
      />
    </Fragment>
  );
};

export default SearchResultsPage;

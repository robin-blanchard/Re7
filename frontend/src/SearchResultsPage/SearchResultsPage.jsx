import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import { axiosInstanceNoAuth } from "../axiosApi";
import InfiniteScroll from "../RecipeGrid/InifiniteScroll";
import RecipeGrid from "../RecipeGrid/RecipeGrid";

const SearchResultsPage = () => {
  const data = useLocation();

  const [search, setSearch] = useState(data.state ? data.state.search : "");
  const [searchCategory, setSearchCategory] = useState(
    data.state ? data.state.searchCategory : "Recettes"
  );
  const [urlSearch, setUrlSearch] = useState("");

  useEffect(() => {
    if (search === "") {
      setUrlSearch("");
      return;
    }

    const url =
      "api/search/recipes".repeat(searchCategory === "Recettes") +
      "auth/users".repeat(searchCategory === "Utilisateurs");
    setUrlSearch(url + "?search=" + search);
  }, [search, searchCategory]);

  console.log(urlSearch);
  return (
    <Fragment>
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
      {search !== "" ? (
        <InfiniteScroll
          componentToScroll={RecipeGrid}
          axiosInstance={axiosInstanceNoAuth}
          limit={6}
          url={urlSearch}
        />
      ) : (
        "Pas de mot"
      )}
    </Fragment>
  );
};

export default SearchResultsPage;

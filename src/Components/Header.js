import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Header = ({ search }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (search === true) {
      navigate("/");
    } else {
      navigate("/search");
    }
  };

  return (
    <div class="list-books-title">
      <h1>MyReads</h1>
      <Button
        onClick={() => onClickHandler()}
        style={{
          position: "absolute",
          right: "100px",
          top: "20px",
          backgroundColor: "purple",
          color: "whitesmoke",
        }}
      >
        {search === true ? "home" : "Search"}
      </Button>
    </div>
  );
};

export default Header;

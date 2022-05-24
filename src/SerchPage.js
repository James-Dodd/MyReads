import React, { useState } from "react";
import Header from "./Components/Header";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BookCard from "./Components/BookCard";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import DangerousIcon from "@mui/icons-material/Dangerous";
import * as BooksApi from "./BooksAPI";

const App = (props) => {
  const { bookstate, trigger } = props;
  const bookArr = Object.values(bookstate);
  const [booksres, setBooksres] = useState([]);
  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    paddingTop: "10px",
  };
  const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  const queryErr = (value) => {
    if (value === undefined) {
      return [];
    }
    return value;
  };
  const processChange = debounce(function changeHandler(e) {
    e.target.value !== ""
      ? BooksApi.search(e.target.value).then((books) => {
          const booksDict = Object.values(books);
          const booksHold = booksDict.map(
            (obj) => bookArr.find((o) => o.id === obj.id) || obj
          );
          setBooksres(booksHold);
        })
      : setBooksres([]);
  }, 250);
  console.log("here is book res --->", booksres);
  return (
    <Box sx={{ minHeight: "100%" }}>
      <Header search={true} />
      <Box component="form" noValidate autoComplete="off">
        <TextField
          onKeyUp={processChange}
          style={{
            minWidth: "1000px",
            position: "absolute",
            left: "450px",
            marginTop: "20px",
          }}
          id="Search"
          label="Search"
          variant="outlined"
        />
      </Box>
      <Box
        style={{ marginTop: "100px", minHeight: "100%" }}
        sx={{ flexGrow: 1 }}
      >
        <Divider />
        {booksres.includes("empty query") ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100%",
              minWidth: "100%",
              alignContent: "center",
              flexDirection: "column",
            }}
          >
            <DangerousIcon
              sx={{ padding: "20px", minHeight: "300px", minWidth: "300px" }}
              color="warning"
            />
            <h1>No Books Found</h1>
          </Box>
        ) : (
          <Grid
            sx={gridContainer}
            container
            columns={3}
            justifyContent="center"
            spacing={2}
          >
            {booksres.map((book) => (
              <Grid item xs={6} md={8}>
                {" "}
                <BookCard book={book} getBook={trigger} />{" "}
              </Grid>
            ))}{" "}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default App;

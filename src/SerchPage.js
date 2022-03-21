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
  return (
    <div>
      <div>
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
        <Box style={{ marginTop: "100px" }} sx={{ flexGrow: 1 }}>
          <Divider />
          <Grid
            sx={gridContainer}
            container
            columns={3}
            justifyContent="center"
            spacing={2}
          >
            {booksres === undefined ? (
              <DangerousIcon fontSize="large" color="disabled" />
            ) : (
              booksres.map((book) => (
                <Grid item xs={6} md={8}>
                  {" "}
                  <BookCard book={book} getBook={trigger} />{" "}
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default App;

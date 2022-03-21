import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as BooksApi from "../BooksAPI";

const BookCard = (props) => {
  const { book, getBook } = props;
  const booka = book;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (shelf) => {
    BooksApi.update(book, shelf);
    setAnchorEl(null);
    getBook();
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="400"
        image={
          booka.hasOwnProperty("imageLinks") === false
            ? "https://as1.ftcdn.net/v2/jpg/03/35/13/14/1000_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg"
            : booka.imageLinks.thumbnail
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {booka.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {booka.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          id="book-button"
          aria-controls={open ? "book-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          size="small"
        >
          Move Book
        </Button>
        <Menu
          id="book-menu"
          aria-labelledby="book-button"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose()}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {booka.shelf === "read" ? null : (
            <MenuItem onClick={() => handleClose("read")}>Read</MenuItem>
          )}
          {booka.shelf === "wantToRead" ? null : (
            <MenuItem onClick={() => handleClose("wantToRead")}>
              Want To Read
            </MenuItem>
          )}
          {booka.shelf === "currentlyReading" ? null : (
            <MenuItem onClick={() => handleClose("currentlyReading")}>
              Currently Reading
            </MenuItem>
          )}
        </Menu>
      </CardActions>
    </Card>
  );
};

export default BookCard;

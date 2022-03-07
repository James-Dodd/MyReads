import React, { useEffect, useState } from "react";
import * as BooksApi from './BooksAPI';
import BookCard from "./Components/BookCard";
import Header from "./Components/Header";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';


const App =(history)=>{
    const [books, setBooks] = useState({});
    const [reRender, setReRender] = useState(false);
    const wantToRead = [];
    const read = [];
    const currentread = [];
    const gridContainer = {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        paddingTop: '10px',
      };

    const trigger =()=>{
        setReRender(!reRender);}
    useEffect(()=>{
        BooksApi.getAll().then((books) => {
            const booksDict = {};
            for (const book of books) {
              booksDict[book.id] = book;
            }
            setBooks(booksDict)
          });
          Object.entries(books).map(([key, value]) => {switch(value.shelf){
              case'currentlyReading': currentread.push(value); break;
              case'wantToRead': wantToRead.push(value); break;
              case'read': read.push(value); break;
              }},
              )
    },[])
    return (
        <div>
            <Header history={history} search={false}/>
            {Object.entries(books).map(([key, value]) => {switch(value.shelf){
                case'currentlyReading': currentread.push(value); break;
                case'wantToRead': wantToRead.push(value); break;
                case'read': read.push(value); break;
                }},
                )}
            <Box sx={{ flexGrow: 1 }}>
                <h1 class="centered">Read</h1>
                <Divider/>
                <Grid sx={gridContainer} container columns={3} justifyContent="center" spacing={2}>
                    {read.map(book => <Grid item xs={6} md={8}> <BookCard book={book} getBook={trigger}/> </Grid>)}
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <h1 class="centered">Want to read</h1>
                <Divider/>
                <Grid sx={gridContainer} container columns={3} justifyContent="center" spacing={2}>
                    {wantToRead.map(book => <Grid item xs={6} md={8}> <BookCard book={book} getBook={trigger}/> </Grid>)}
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <h1 class="centered">Currently reading</h1>
                <Divider/>
                <Grid sx={gridContainer} container columns={3} justifyContent="center" spacing={2}>
                    {currentread.map(book => <Grid item xs={6} md={8}> <BookCard book={book} getBook={trigger}/> </Grid>)}
                </Grid>
            </Box>
        </div>
    )
};

export default App;
import React, {  useState } from "react";
import Header from "./Components/Header";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BookCard from "./Components/BookCard";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import * as BooksApi from './BooksAPI';


const App =()=>{
    const [booksres, setBooksres]=useState({});
    const gridContainer = {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        paddingTop: '10px',
      };
    const queryErr=(value)=>{
        console.log('here is value --->', value)
        if (value===undefined){
            console.log('triggered');
            return 'a';
        }
        return value;
    }
    const changeHandler=(e)=>{
        console.log(e.target.value)
        
        BooksApi.search(queryErr(e.target.value)).then((books) => {
            const booksDict = {};
            for (const book of books) {
              booksDict[book.id] = book;
            }
            setBooksres(booksDict)
            console.log('here is books --->', booksres)
          });
    }
    return (
        <div>
            <div>
                <Header search={true}/>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                        <TextField onKeyDown={changeHandler} style={{minWidth:'1000px', position:'absolute', left:'450px', marginTop:'20px'}}id="Search" label="Search" variant="outlined" />
                </Box>
                <Box style={{marginTop:'100px'}} sx={{ flexGrow: 1 }}>
                <Divider/>
                <Grid sx={gridContainer} container columns={3} justifyContent="center" spacing={2}>
                    {Object.entries(booksres).map(([key, value]) => <Grid item xs={6} md={8}> <BookCard book={value}/> </Grid>)}
                    </Grid>
                </Box>
            </div>

        </div>
    )
};

export default App;
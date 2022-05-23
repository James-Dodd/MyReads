import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import App from "./App";
import * as BooksApi from "./BooksAPI";
import SerchPage from "./SerchPage";

const Router = () => {
  const [books, setBooks] = useState({});
  const [reRender, setReRender] = useState(false);
  const trigger = () => {
    setReRender(!reRender);
  };
  useEffect(() => {
    BooksApi.getAll().then((books) => {
      const booksDict = {};
      for (const book of books) {
        booksDict[book.id] = book;
      }
      setBooks(booksDict);
    });
  }, [reRender]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App books={books} trigger={trigger} />} />
        <Route
          path="/search"
          element={<SerchPage bookstate={books} trigger={trigger} />}
        />
        <Route path="*" element={<App books={books} trigger={trigger} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

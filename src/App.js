import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [hex, setHex] = useState("#ffffff");

  useEffect(() => {
    getQuote();
    hexColorChange();
  }, []);

  const getQuote = async () => {
    const api = "http://api.quotable.io/random";
    try {
      const data = await axios.get(api);
      setQuote(data.data.content);
      setAuthor(data.data.author);
    } catch (error) {
      console.log(error);
    }
  };

  const hexColorChange = () => {
    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += (
        "0" +
        Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
      ).slice(-2);
    }
    setHex(color);
  };

  return (
    <div className="container" style={{ backgroundColor: `${hex}` }}>
      <div className="wrapper">
        <p className="quote">{quote}</p>
        <p className="quoteMark" style={{ color: `${hex}` }}>
          ''
        </p>
        <p className="author">- {author}</p>
        <a
          className="twitterLink"
          href={`http://twitter.com/intent/tweet?text=${quote}`}
        >
          <i className="fab fa-twitter"></i>
          Tweet
        </a>
        <button
          onClick={() => {
            getQuote();
            hexColorChange();
          }}
          style={{ borderColor: `${hex}`, color: `${hex}` }}
          className="getQuote"
        >
          random quote
        </button>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import Header from "../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import Card from "../components/Card";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Home() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("marvel");
  const [sortGoodBad, setSortGoodBad] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&language=fr-FR`
      )
      .then((res) => setData(res.data.results));

    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${search}&language=fr-FR&page=1&include_adult=false`
      )
      .then((res) => setData(res.data.results));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const mostPopular = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&video=true&language=fr-FR&page=1`
      )
      .then((res) => setData(res.data.results));
  };

  const popularTv = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=fr-FR&page=1`
      )
      .then((res) => setData(res.data.results));
  };

  return (
    <div className="container animate__animated animate__fadeIn">
      <Header />
      <div className="input">
        <div className="search-input ">
          <SearchIcon className="white" />
          <input
            id="input"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Chercher un film, une série..."
          />
        </div>

        <div className="filter  ">
          <button onClick={mostPopular}>Films populaires</button>
          <button onClick={popularTv}>Séries populaires</button>
          <div className="btn-sort">
            <button
              className="btn-sort"
              id="goodToBad"
              onClick={() => setSortGoodBad("goodToBad")}
            >
              Mieux notés
            </button>
            <button
              className="btn-sort"
              id="badToGood"
              onClick={() => setSortGoodBad("badToGood")}
            >
              Moins notés
            </button>
          </div>
        </div>
      </div>

      <div className="films">
        {data
          .sort((a, b) => {
            if (sortGoodBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === "badToGood") {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
}

export default Home;

import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
function Loved() {
  const [listData, setListData] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];
    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=${apiKey}&query=&language=fr-FR`
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="loved-list">
      <Header />

      <div className="films">
        {listData.length > 0 ? (
          listData.map((movie) => <Card key={`${movie.id}`} movie={movie} />)
        ) : (
          <h3>Aucun coup de coeur pour l'instant...</h3>
        )}
      </div>
    </div>
  );
}

export default Loved;

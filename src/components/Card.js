import React, { useState } from "react";
import noImage from "../../src/img/poster.jpg";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Carousel from "nuka-carousel";
import { useEffect } from "react";

function Card({ movie }) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [open, setOpen] = useState(false);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [data, setData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formaDate = (date) => {
    let [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };
  const genreFinder = () => {
    let genreArray = [];
    for (let i = 0; i < movie.genre_ids.length; i++) {
      switch (movie.genre_ids[i]) {
        case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Aventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comédie`);
          break;
        case 80:
          genreArray.push(`Policier`);
          break;
        case 99:
          genreArray.push(`Documentaire`);
          break;
        case 18:
          genreArray.push(`Drame`);
          break;
        case 10751:
          genreArray.push(`Famille`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`Histoire`);
          break;
        case 27:
          genreArray.push(`Horreur`);
          break;
        case 10402:
          genreArray.push(`Musique`);
          break;
        case 9648:
          genreArray.push(`Mystère`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-fiction`);
          break;
        case 10765:
          genreArray.push(`Science-Fi & Fantasy`);
          break;
        case 10770:
          genreArray.push(`Téléfilm`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Guerre`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
    }
    return genreArray.map((genre) => (
      <p className="list" key={genre}>
        {genre}
      </p>
    ));
  };

  // LocalStorage
  const addStorage = () => {
    let storeData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    if (!storeData.includes(movie.id.toString())) {
      storeData.push(movie.id);
      window.localStorage.movies = storeData;
    }
    Swal.fire({
      text: "Ajouter aux favoris !",
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 1500,
    });
  };

  const deleteStorage = () => {
    let storedData = window.localStorage.movies.split(",");
    let newData = storedData.filter((id) => id != movie.id);
    window.localStorage.movies = newData;
    Swal.fire({
      text: "Film retiré des favoris!",
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 1800,
    });
  };

  const getCredits = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}&langage=fr-FR`
      )
      .then((res) => setCast(res.data.cast));
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${movie.id}/credits?api_key=${API_KEY}&langage=fr-FR`
      )
      .then((res) => setCast(res.data.cast));
  };

  const getSimilar = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=${API_KEY}&include_adult=false&langage=fr-FR`
      )
      .then((res) => setSimilar(res.data.results));
  };
  const getSimilarTv = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${movie.id}/similar?api_key=${API_KEY}&include_adult=false&langage=fr-FR`
      )
      .then((res) => setSimilar(res.data.results));
  };
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/tv/${movie.id}?api_key=${API_KEY}&include_adult=false&langage=fr-FR`
  //     )
  //     .then((res) => setData(res.data));
  // }, []);

  const wrapperFunction = () => {
    getSimilar();
    getCredits();
    handleOpen();
    getSimilarTv();
  };

  return (
    <div className="card">
      <div className="affiche">
        <img
          src={
            movie.poster_path
              ? "https://image.tmdb.org/t/p/original/" + movie.poster_path
              : noImage
          }
          alt={movie.title}
        />
      </div>

      <div className="modal-container">
        <Button className="btn-infos" onClick={wrapperFunction}>
          Plus d'infos
        </Button>
        <Modal
          className="modal"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-info">
            <img
              className="backdrop-img"
              src={
                movie.backdrop_path
                  ? "https://image.tmdb.org/t/p/original/" + movie.backdrop_path
                  : noImage || movie.title
              }
              alt=""
            />
            <h1 id="modal-modal-title" variant="h2">
              {movie.title || movie.name}
            </h1>
            <p id="modal-modal-description">
              <span>Synopsis :</span> {movie.overview || "Nothing..."}
            </p>
            <div className="tv_infos">
              {/* <p>Nombre de saison : {movie.number_of_episodes}</p>
              <p>Nombre d'épisodes : {movie.number_of_seasons}</p> */}
            </div>
            <p>{movie.vote_average.toFixed(1)}/10 🌟</p>
            {movie.release_date ? (
              <p>Sorti le : {formaDate(movie.release_date)}</p>
            ) : null}
            {movie.first_air_date ? (
              <p>Sortie le : {formaDate(movie.first_air_date)}</p>
            ) : null}
            <div className="genre">
              {movie.genre_ids
                ? genreFinder()
                : movie.genres.map((genre) => (
                    <p className="list" key={genre}>
                      {genre.name}
                    </p>
                  ))}
            </div>
            {movie.genre_ids ? (
              <button className="favoris" onClick={() => addStorage()}>
                Ajouter aux favoris
              </button>
            ) : (
              <button
                className="favoris"
                onClick={() => {
                  deleteStorage();
                  window.setTimeout(function () {
                    window.location.reload();
                  }, 1900);
                }}
              >
                Retirer des favoris
              </button>
            )}
            <h3 className="similar-text">Casting</h3>

            <Carousel
              className="casting"
              autoplay={true}
              wrapAround={true}
              slidesToShow={4}
              cellSpacing={2}
              pauseOnHover={true}
              swiping={true}
              adaptiveHeight={true}
              defaultControlsConfig={{
                pagingDotsStyle: {
                  visibility: "hidden",
                },
              }}
            >
              {cast.map((actor) => (
                <div className="cast-infos">
                  <div className="cast_card">
                    <img
                      src={
                        actor.profile_path
                          ? "https://image.tmdb.org/t/p/original/" +
                            actor.profile_path
                          : noImage
                      }
                      alt={actor.name}
                    />
                    <p key={actor.id}>{actor.name}</p>
                  </div>
                </div>
              ))}
            </Carousel>

            <p className="similar-text">Titres similaire</p>
            <Carousel
              className="similar"
              autoplay={true}
              wrapAround={true}
              slidesToShow={3}
              cellSpacing={3}
              pauseOnHover={true}
              swiping={true}
              adaptiveHeight={true}
              defaultControlsConfig={{
                pagingDotsStyle: {
                  visibility: "hidden",
                },
              }}
            >
              {similar.map((similars) => (
                <img
                  src={
                    similars.poster_path
                      ? "https://image.tmdb.org/t/p/original/" +
                        similars.poster_path
                      : noImage
                  }
                  alt={similars.title}
                />
              ))}
            </Carousel>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Card;

// const tagsEl = document.getElementById("tags");
// var selectedGenre = [];

// const selectGenre = () => {
//   tagsEl.innerHTML = "";
//   genres.forEach((genre) => {
//     const t = document.createElement("div");
//     t.classList.add("tag");
//     t.id = genre.id;
//     t.innerText = genre.name;
//     t.addEventListener("click", () => {
//       if (selectedGenre.lenght == 0) {
//         selectGenre.push(genre.id);
//       } else {
//         if (selectGenre.includes(genre.id)) {
//           selectedGenre.forEach((id, idx) => {
//             if (id == genre.id) {
//               selectedGenre.splice(idx, 1);
//             }
//           });
//         } else {
//           selectGenre.push(genre.id);
//         }
//       }
//       axios
//         .get(
//           `https://api.themoviedb.org/3/discover/movie?api_key=df692eb3fc27cdc0e8966e3dd0aa2062&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=10&with_genres=${selectedGenre}&with_watch_monetization_types=flatrate`
//         )
//         .then((res) => setData(res.data.results));
//     });
//   });
// };
// selectGenre();

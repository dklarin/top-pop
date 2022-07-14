import React, { useState } from "react";

export const Layout = () => {
  const [countries, setCountries] = useState([]);

  async function fetchMoviesJSON() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const movies = await response.json();
    return movies;
  }
  fetchMoviesJSON().then((movies) => {
    console.log(movies);
    //console.log(movies[0].population); // fetched movies
    setCountries(movies);
  });

  return (
    <div>
      {countries.map((country) => (
        <div>
          {country.name.common} - {country.population}
        </div>
      ))}
    </div>
  );
};

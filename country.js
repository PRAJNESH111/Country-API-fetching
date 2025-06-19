// console.log(new URLSearchParams(location.search).get("name"));
let flagimg = document.querySelector(".countire-detailes img");

// Get the country name from the URL (e.g., ?name=India)
let coutryname = new URLSearchParams(location.search).get("name");
let countriNameH1 = document.querySelector(".countire-detailes h1");
let nativename = document.querySelector(".nativename");
let population = document.querySelector(".population");
let region = document.querySelector(".region");
let subregion = document.querySelector(".subregion");
let capital = document.querySelector(".capital");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borders = document.querySelector(".border-countires a");

const toplevdomain = document.querySelector(".toplevdomain");

fetch(
  `https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,currencies,languages,borders,tld,subregion`
)
  .then((res) => res.json())
  .then((data) => {
    // Find the country object that matches the name
    let matchedCountry = data.find(
      (country) =>
        country.name.common.toLowerCase() === coutryname.toLowerCase()
    );

    if (matchedCountry) {
      // console.log(matchedCountry);

      flagimg.src = matchedCountry.flags.svg;
      countriNameH1.innerText = matchedCountry.name.common;
      population.innerText = matchedCountry.population.toLocaleString("en-IN");
      region.innerText = matchedCountry.region;
      subregion.innerText = matchedCountry.subregion || "No subregion info";
      toplevdomain.innerHTML = matchedCountry.tld[[0]];

      capital.innerText = matchedCountry.capital?.[0];
      currencies.innerHTML = matchedCountry.currencies
        ? Object.values(matchedCountry.currencies)
            .map((cur) => cur.name)
            .join(", ")
        : "No currency info";

      languages.innerHTML = matchedCountry.languages
        ? Object.values(matchedCountry.languages).join(", ")
        : "No language info";
      if (matchedCountry.borders) {
        // console.log(matchedCountry.borders);
        borders.innerHTML = matchedCountry.borders[0] || "No border info";
        borders.href = `/country.html?name=${country.name.common}`;
      }

      if (matchedCountry.name.nativeName) {
        // console.log(matchedCountry.name.nativeName);
        nativename.innerText = matchedCountry.name.nativeName;
      } else {
        nativename.innerText = matchedCountry.name.official;
      }
      nativename.innerText = matchedCountry.name.common;
    } else {
      console.error("Country not found:", coutryname);
    }
  })
  .catch((err) => console.error("Fetch error:", err));

let themechanger = document.querySelector(".theme-changer");

// themechanger.addEventListener("click", () => {
//   document.body.classList.toggle("dark");
//   if (document.body.classList.contains("dark")) {
//     themechanger.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;Light Mode`;
//   } else {
//     themechanger.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;Dark Mode`;
//   }
// });

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

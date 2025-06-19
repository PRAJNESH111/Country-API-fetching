// async function getData() {
//   const res = await fetch(
//     "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population"
//   )
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// }
// getData();
//*
let countierscontainer = document.querySelector(".countires-container");
const filterbyregion = document.querySelector(".filterbyregion");
var allcountires;

fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population"
)
  .then((res) => res.json())
  .then((data) =>
    data.forEach((country) => {
      let countryCard = document.createElement("a");
      countryCard.classList.add("country-card");
      countryCard.href = `/country.html?name=${country.name.common}`;

      countierscontainer.appendChild(countryCard);

      // let cardimag = document.createElement("img");
      // // cardimag.classList.add("card-img");
      // cardimag.src = "";
      // countryCard.appendChild(cardimag);
      //   console.log(country);

      let cardHTML = `
                    <img src="${country.flags.svg}" alt class="src">
                    <div class="card-text">
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population:</b> ${country.population.toLocaleString(
                          "en-IN"
                        )} </p>
                        <p><b>Region:</b>${country.region}</p>
                        <p><b>Capital:</b>${country.capital[0]}</p>
                    </div>

                `;
      countryCard.innerHTML = cardHTML;
      // console.log(countryCard);
      countierscontainer.appendChild(countryCard);
    })
  );

filterbyregion.addEventListener("change", (e) => {
  const selectedRegion = filterbyregion.value;

  fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population"
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      // Clear previous country cards
      countierscontainer.innerHTML = "";

      // Filter by selected region
      const filteredCountries =
        selectedRegion === "All"
          ? data
          : data.filter((country) => country.region === selectedRegion);

      filteredCountries.forEach((country) => {
        let countryCard = document.createElement("a");
        countryCard.classList.add("country-card");
        countryCard.href = `/country.html?name=${country.name.common}`;

        let cardHTML = `
          <img src="${country.flags.svg}" alt="${
          country.name.common
        } flag" class="card-img">
          <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population:</b> ${country.population.toLocaleString(
              "en-IN"
            )}</p>
            <p><b>Region:</b> ${country.region}</p>
            <p><b>Capital:</b> ${country.capital?.[0] || "N/A"}</p>
          </div>
        `;

        countryCard.innerHTML = cardHTML;
        countierscontainer.appendChild(countryCard);
      });
    })
    .catch((err) => {
      console.error("Error fetching country data:", err);
    });
});

let searchinput = document.querySelector(".search-container input");
fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population"
)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    allcountires = data;
    displaycountires(allcountires); // Show all initially
  });

// Listen for input event
searchinput.addEventListener("input", (e) => {
  let searchText = e.target.value.toLowerCase();

  let filtered = allcountires.filter((country) =>
    country.name.common.toLowerCase().includes(searchText)
  );

  displaycountires(filtered);
});

// Function to display countries
function displaycountires(countries) {
  countierscontainer.innerHTML = "";

  countries.forEach((country) => {
    let countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;

    let cardHTML = `
                    <img src="${country.flags.svg}" alt class="src">
                    <div class="card-text">
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population:</b> ${country.population.toLocaleString(
                          "en-IN"
                        )} </p>
                        <p><b>Region:</b>${country.region}</p>
                        <p><b>Capital:</b>${country.capital[0]}</p>
                    </div>

                `;
    countryCard.innerHTML = cardHTML;

    countierscontainer.appendChild(countryCard);
  });
}

let themechanger = document.querySelector(".theme-changer");

// themechanger.addEventListener("click", () => {
//   document.body.classList.toggle("dark");
//   if (document.body.classList.contains("dark")) {
//     themechanger.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;Light Mode`;
//   } else {
//     themechanger.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;Dark Mode`;
//   }
// });

themechanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Store mode in localStorage
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themechanger.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;Light Mode`;
  } else {
    localStorage.setItem("theme", "light");
    themechanger.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;Dark Mode`;
  }
});

// On page load, apply theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themechanger.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;Light Mode`;
  } else {
    document.body.classList.remove("dark");
    themechanger.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;Dark Mode`;
  }
});

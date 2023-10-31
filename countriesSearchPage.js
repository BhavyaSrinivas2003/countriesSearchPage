function countriesSearchPage() {
    let searchInputEl = document.getElementById("searchInput");
    let resultCountriesEl = document.getElementById("resultCountries");
    let spinnerEl = document.getElementById("spinner");
    let url = "https://apis.ccbp.in/countries-data";
    let searchEl = "";
    let options = {
        method: "GET"
    };

    function createAndAppend(country) {
        let containerEl = document.createElement("div");
        containerEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
        resultCountriesEl.appendChild(containerEl);
        let countryEl = document.createElement("div");
        countryEl.classList.add("d-flex", "flex-row", "country-card");
        containerEl.appendChild(countryEl);
        let countryImg = document.createElement("img");
        countryImg.src = country.flag;
        countryImg.classList.add("country-flag", "mt-auto", "mb-auto", "mr-2");
        countryEl.appendChild(countryImg);
        let descriptionEL = document.createElement("div");
        descriptionEL.classList.add("d-flex", "flex-column");
        countryEl.appendChild(descriptionEL);
        let countryTitleEl = document.createElement("h1");
        countryTitleEl.classList.add("country-name");
        countryTitleEl.textContent = country.name;
        descriptionEL.appendChild(countryTitleEl);
        let populationEl = document.createElement("p");
        populationEl.textContent = country.population;
        populationEl.classList.add("country-population");
        descriptionEL.appendChild(populationEl);
        let breakEl = document.createElement("br");
        resultCountriesEl.appendChild(breakEl);
    }

    function display(countriesList) {
        for (let country of countriesList) {
            let countryName = country.name;
            if (countryName.includes(searchEl)) {
                createAndAppend(country);
            }
        }
    }

    function FetchFun() {
        spinnerEl.classList.remove("d-none");
        resultCountriesEl.classList.add("d-none");
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                spinnerEl.classList.add("d-none");
                resultCountriesEl.classList.remove("d-none");
                resultCountriesEl.textContent = "";
                let countriesList = jsonData
                display(countriesList)
            });
    }


    function onChangeSearch(event) {
        searchEl = event.target.value;
        FetchFun()
    }
    searchInputEl.addEventListener("keyup", onChangeSearch);
    FetchFun()
}
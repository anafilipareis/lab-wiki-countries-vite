import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
    const [foundCountries, setFoundCountry] = useState([]);

    // The useEffect hook is used to make a GET request to the Countries API when the component mounts. 
    // The response data (list of countries) is then stored in the state variable foundCountries.
    useEffect(() => {
        axios
          .get("https://ih-countries-api.herokuapp.com/countries")
          .then((response) => {
            console.log("response.data: ", response.data);
            setFoundCountry(response.data);
            console.log("One country: ", response.data[0]);
          });
      }, []);

    
    return (
        <div className="container" style={{maxHeight:"90vh", overflow:"scroll"}}>
          <h1 style={{ fontSize: "24px" }}>
            WikiCountries: Your Guide to the World
          </h1>
    {/* The component renders a heading and checks if the list of countries (foundCountries) is available. */}

            {/* If the list is not available: */}
            {!foundCountries && <p>Countries not found!</p>}
            {/* If the list is available, it maps through the countries array and renders a Link component for each country. */}
            {foundCountries && (
            <div className="list-group">
                {foundCountries.map((country) => (
                <Link key={country._id} className="list-group-item list-group-item-action" to={`/${country.alpha3Code}`}>
                <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} />
                <br />
                {country.name.common}
                </Link>
                ))}
            </div>
            )}
        </div>
      );
    }


export default HomePage;

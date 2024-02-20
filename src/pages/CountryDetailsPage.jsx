import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";


function CountryDetails() {
  const [fetching, setFetching] = useState(true);
  const [foundCountry, setFoundCountry] = useState(null);
  const { countryId } = useParams(); //A hook from React Router that allows the component to access parameters from the URL. In this case, it extracts countryId from the URL


  //A hook that runs side effects in the component. 
  //it makes a GET request to the Countries API to fetch details about the specified country (countryId). 
  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then((response) => {
        setFoundCountry(response.data);
        setFetching(false);
      });
  }, [countryId]);

 
 
  return (
    <div className="container">
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>

      {/* While fetching data, it displays a loading message */}
      {fetching && <p>Loading...</p>}
      {/* If the country is not found, it displays a message */}
      {!foundCountry && <p>Country not found!</p>}
      {/* If the data is fetched successfully, it displays detailed information about the country. */}
      {!fetching && foundCountry && (
        // Country Details
        <div>
          <img
            src={`https://flagpedia.net/data/flags/icon/72x54/${foundCountry.alpha2Code.toLowerCase()}.png`}
            alt="country flag"
          />
          <h1>{foundCountry.name.common}</h1>
          <br />
          {/* Aditional Table details */}
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: "30%" }}>Capital</td>
                <td>{foundCountry.capital}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {foundCountry.area} km
                  <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                {/* Linking to Bordering Countries */}
                <td>
                  <ul style={{ listStyle: 'none'}}>
                    {foundCountry.borders.map((border) => {
                      // For each bordering country, it creates a list item with a link to the CountryDetails page for that specific country.
                      return (
                        <li key={border}>
                          <Link to={`/${border}`}> {border} </Link>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default CountryDetails;


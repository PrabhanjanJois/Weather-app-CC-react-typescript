import React, { FormEvent, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Alert, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../back22.jpeg";
import "./CountryDetails.css";
import { textAlign } from "@mui/material/node_modules/@mui/system";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  },
};

const useStyles = makeStyles({
  root: {
    border: 0,
    background: "linear-gradient(50deg, #333, #999)",
    borderRadius: 20,
    color: "black",
    padding: "0 30px",
  },
});

function ButtonStyled() {
  const classes = useStyles();
  return <Button className={classes.root}></Button>;
}

type InitiProps = {
  name: string;
};

interface InitCountry {
  capital: string[];
  population: number;
  latlng: number[];
  flags: {
    svg: string;
  };
}

interface InitCountryWeatherInfo {
  temperature: number;
  weather_icons: string[];
  wind_speed: number;
  precip: number;
}

export const CountryDetails: React.FC = () => {
  const { name } = useParams<InitiProps>();
  const [countryInfo, setCountryInfo] = useState<InitCountry>();
  const [capitalName, setCapitalName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState<InitCountryWeatherInfo>();
  const [countryApiError, setCountryApiError] = useState<Boolean>(false);
  const [weatherApiError, setWeatherApiError] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();

  const getCountryData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const data = response.data;
      setCountryInfo(data[0]);
      setCapitalName(data[0].capital[0]);
    } catch (error) {
      setCountryApiError(true);
    }
  }, [name]);

  useEffect(() => {
    getCountryData();
  }, [getCountryData]);

  const getWeatherDetails = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=89f9f82ab31369dd8ec1f48e2b27e588&query=${capitalName}`
      );
      const data = response.data;
      setWeatherInfo(data.current);
      setLoading(false);
    } catch (error) {
      setWeatherApiError(true);
    }
  };

  const getBackToHome = (e: FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <Paper style={styles.paperContainer}>
      <Container style={{ textAlign: "center" }} maxWidth="sm">
        <div>
          <h1 className="font-country">Country Details</h1>

          {countryInfo ? (
            <div data-testid="country-info" className="font-ptag">
              <img
                width={230}
                src={countryInfo.flags.svg}
                height="100px"
                alt=""
              />
              <p> Capital: {countryInfo.capital[0]} </p>
              <p>Population: {countryInfo.population}</p>
              <p>
                Latitude: {countryInfo.latlng[0]}
                <sup>o</sup>
              </p>
              <p>
                Longitude: {countryInfo.latlng[1]}
                <sup>o</sup>
              </p>
              <Button
                style={{
                  fontFamily: "Carter One",
                  borderRadius: 20,
                  color: "white",
                  fontWeight: "lighter",
                }}
                className="button-29"
                //size="small"
                variant="outlined"
                onClick={getWeatherDetails}
              >
                Capital Weather
              </Button>
            </div>
          ) : (
            <div>
              {" "}
              {countryApiError ? (
                <>
                  <Alert severity="warning" sx={{ m: 2 }}>
                    Country info not found!
                  </Alert>
                  <Button
                    size="medium"
                    variant="contained"
                    onClick={getBackToHome}
                  >
                    Please Try Again !!
                  </Button>
                </>
              ) : (
                "Loading..."
              )}
            </div>
          )}

          {weatherInfo ? (
            <div className="weather-content" data-testid="weather-details">
              <br />
              <h1 className="font-country">Weather Info</h1>
              <img src={weatherInfo.weather_icons[0]} alt="Weather Icon" />
              <p className="font-ptag">
                Temperature: {weatherInfo.temperature}
                <sup>o</sup>
              </p>
              <p className="font-ptag">
                Wind Speed: {weatherInfo.wind_speed} km/ph
              </p>
              <p className="font-ptag">Precip: {weatherInfo.precip} %</p>
              <p>
                Developed By Jois Prabhanjan <br />{" "}
                <a
                  style={{ color: "black" }}
                  href="https://github.com/PrabhanjanJois"
                >
                  GitHub
                </a>
              </p>
            </div>
          ) : (
            <div>
              {weatherApiError ? (
                <Alert severity="warning">
                  Weather info not found. Please try again!
                </Alert>
              ) : (
                <p>{loading ? "Loading..." : ""}</p>
              )}
            </div>
          )}
        </div>
      </Container>
    </Paper>
  );
};

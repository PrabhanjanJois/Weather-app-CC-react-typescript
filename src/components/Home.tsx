import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Paper } from "@mui/material";
import "./Home.css";
import { Container } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import CssBaseline from "@material-ui/core/CssBaseline";
import Image from "../bluebg.jpg";
import SendIcon from "@material-ui/icons/Send";

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
export const Home: React.FC = () => {
  const [countryName, setCountryName] = useState("");
  const navigate = useNavigate();

  const getCuntryName = async (e: FormEvent) => {
    e.preventDefault();
    navigate(`/details/${countryName}`);
  };

  return (
    <Paper style={styles.paperContainer}>
      <Container maxWidth="sm">
        <div className="my-3">
          <h1 className="font-link">Weather Application</h1>
          <TextField
            id="outlined-basic"
            fullWidth
            value={countryName}
            label="Enter country Name"
            variant="outlined"
            data-testid="inputbox-test-id"
            onChange={(e) => setCountryName(e.target.value)}
          />
        </div>
        <Button
          style={{
            fontFamily: "Carter One",
          }}
          size="medium"
          variant="contained"
          className="button-8"
          data-testid="button-testid"
          endIcon={<SendIcon />}
          disabled={countryName === ""}
          onClick={getCuntryName}
        >
          Submit
        </Button>
      </Container>
    </Paper>
  );
};

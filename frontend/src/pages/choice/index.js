import { Link, useParams } from "react-router-dom";
import "./style.css";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import Background from "../../images/Background.png"
const Choice = () => {
  const { email } = useParams();
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Container maxWidth="md" sx={{ mb: 5, mt: 1 }}>
      <img
        src={Background} alt="Background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          marginBottom: "-2rem",
        }}
      />
      <Typography sx={{ mt: 5, color: "black" }} variant="body1" align="center">
        Sélectionnez un choix ci-dessous:
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 1 }}
      >
        <Button
          variant="contained"
          href={`../choiceSupplier/${email}`}
          color="secondary"
          sx={{ width: "50%" }}
        >
          Fournisseur
        </Button>
        <Button
          variant="contained"
          href={`/activate-science/20481/admin/${email}`}
          sx={{ width: "50%" }}
        >
          Organisateur
        </Button>
      </Stack>
    </Container>
  );
};

export default Choice;

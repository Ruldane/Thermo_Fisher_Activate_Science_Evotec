import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Background from '../../images/Background.png';

export default function LoginForm() {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = () => {
    setLoading(true);
    if (isValidEmail(email)) {
      setLoading(false);
      navigate(`/signin/${email}`);
    } else {
      setLoading(false);
      setError("Votre mail n'est pas valide");
    }
  };

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Container maxWidth="md" sx={{ mb: 5 }}>
      <img
        src={Background} alt="background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          marginBottom: "-2rem",
        }}
      />
      <Typography
        sx={{ mt: 5, color: "black" }}
        variant={matchesSM ? "h3" : "h5"}
        align="center"
      >
          Bienvenue sur la page d'inscription de l’Activate Science Sanofi Marcy l'Etoile.
      </Typography>
      <Typography sx={{mt:1}} variant="body2" align="center">Cet événement aura lieu le  16 mars 2023 de 9h à 17h, bâtiment X Salles Polaris et Andromède</Typography>
      <Typography sx={{ mt: 3 }} align="center">
          C'est une excellente occasion pour vous d'en apprendre davantage sur les dernières innovations de nos partenaires,
          fournisseurs ainsi que d'acquérir une expérience de première main sur les équipements, consommables et réactifs présentés.
      </Typography>
      <Typography sx={{ mt: 2 }} align="center">
          Vous pourrez également assister à une présentation sur la cytométrie par notre
          fournisseur Thermo Scientific qui se déroulera de 10h30 à 11h30 (salle Auditorium Bat X Sud).
      </Typography>
      <Typography sx={{ mt: 2 }} align="center">
          Des rafraichissements seront proposés <br />tout au long de la journée. <br />
          <br />Veuillez vous pré-inscrire en saisissant votre adresse e-mail ci-dessous.
          Cela vous permettra d'obtenir votre QR code unique à utiliser le jour de l’évènement.
      </Typography>

      <Box component="form" onSubmit={submitHandler}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="emailAddress"
          label="Adresse Email"
          name="emailAddress"
          autoFocus
          onChange={(event) => setEmail(event.target.value)}
        />
        {error && (
          <Typography sx={{ color: "red", mt: 1, mb: 1 }}>{error}</Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!isValidEmail(email)}
        >
          Validez votre inscription
        </Button>
      </Box>
      <Typography sx={{ mt: 3 }} align="center" variant="body2">
        Thermo Fisher Scientific © 2023
      </Typography>
    </Container>
  );
}

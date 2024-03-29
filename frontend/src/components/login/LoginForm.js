import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Background from '../../images/Background.webp';

export default function LoginForm() {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const matchesLessSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
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

  const suppliers = [
    'Cytiva',
    'Asecos',
    'Eppendorf',
    'Sartorius',
    'Corning',
    'Thermo Scientific BID',
    'Thermo Scientific LCD',
    'Thermo Scientific LPD',
    'DWK',
    'Ansell',
    'Julabo',
    'Kimberly Clark',
    'Purus',
    'Steris',
    'Dupont de Nemours',
  ];

  return (
    <Container maxWidth="md" sx={{ mb: 5 }}>
      <img
        src={Background}
        alt="background"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          marginBottom: '-2rem',
        }}
      />
      <Typography
        sx={{ mt: 5, color: 'black' }}
        variant={matchesSM ? 'h3' : 'h5'}
        align="center"
      >
        Bienvenue sur la page d'inscription de l’Activate Science Evotec
        Toulouse.
      </Typography>
      <Typography
        sx={{ mt: 1 }}
        variant={matchesSM ? 'h5' : 'body2'}
        align="center"
      >
        Cet événement aura lieu le 4 avril 2023 de 9h à 17h, bâtiment B16
      </Typography>
      <Typography sx={{ mt: 3 }} align="center">
        Que vous travailliez dans le domaine de la biologie, de la chimie, de la
        maintenance, de la logistique, des achats ou de la sécurité, cet
        évènement est une excellente occasion pour vous d'en apprendre davantage
        sur les dernières innovations de nos fournisseurs partenaires. Il vous
        permettra également d'acquérir une expérience de première main sur les
        équipements, consommables et réactifs présentés.
      </Typography>
      <Typography
        sx={{ mt: 2 }}
        variant={matchesSM ? 'body1' : 'body2'}
        align="center"
      >
        Votre sécurité étant notre priorité, retrouvez nos partenaires dans la
        zone safety au 1er étage.
      </Typography>
      <Typography
        sx={{ mt: 2 }}
        variant={matchesSM ? 'body1' : 'body2'}
        align="center"
      >
        Un buffet sera servi à l'heure du déjeuner et des rafraichissements
        seront à votre disposition tout au long de l'évènement.
      </Typography>
      <Typography
        sx={{ mt: 2 }}
        variant={matchesSM ? 'body1' : 'body2'}
        align="center"
      >
        Un pack de goodies sera également remis aux participants.
      </Typography>
      <Typography
        sx={{ mt: 2 }}
        variant={matchesSM ? 'body1' : 'body2'}
        align="center"
      >
        Nos partenaires présents à cet événement seront:{' '}
        {suppliers.sort().map((supplier) => (
          <span key={supplier}>{supplier}, </span>
        ))}
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
          <Typography sx={{ color: 'red', mt: 1, mb: 1 }}>{error}</Typography>
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
      <Typography
        sx={{ mt: 3 }}
        align="center"
        variant={matchesSM ? 'body1' : 'body2'}
      >
        Thermo Fisher Scientific © 2023
      </Typography>
    </Container>
  );
}

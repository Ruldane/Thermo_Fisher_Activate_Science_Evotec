import * as React from "react";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Background from '../../images/Background.png'
import {InputLabel} from "@mui/material";
export default function SignIn() {
    const {email} = useParams();

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {{
        setUser({
          ...user,
            [e.target.name]: e.target.value
        });
    }}

    const checkIfUserRegister = async (checkEmail) => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/CheckIfUserPreRegister`);
            data.elements.map(element => {
                    if(element['fieldValues'].some(element => element.value === checkEmail)){
                        navigate(`/qrcode/${email}`);
                    }
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if(email) {
            checkIfUserRegister(email);
            getUserByEmail(email);
        }
    }, []);

    const getUserByEmail = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/getUserByEmail`,
                {"email": email},
            );
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(user);
  const handleSubmit = async (event) => {
    event.preventDefault();

      try {
          const { data } = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/preRegisterActivateScience`,
              {
                  "emailAddress": user.emailAddress,
                  "accountNumber": user.accountNumber ? user.accountNumber : "no number account",
                  "firstName": user.firstName,
                  "lastName": user.lastName,
                  "company": user.company,
                  "businessPhone": user.businessPhone ? user.businessPhone : "no phone number",
                  "address1": user.address1,
                  "city": user.city,
                  "address2": user.address2 ? user.address2 : "no address 2",
                  "zipPostal": user.zipPostal,
                  "country": user.country,
                  "title": user.title
              }
          );
          if(data?.confirmation) {
              navigate(`/qrcode/${user.emailAddress}`);
          }
      } catch (error) {
          console.error(error);
          return;
      }
  };
    useEffect(() => {
        if(email) {
            getUserByEmail();
        }

    }, [email]);


  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Container
        maxWidth="sm"
        fixed
        sx={{
          position: "fixed",
          zIndex: 99999,
          marginLeft: "-0.98rem",
          top: 0,
          backgroundColor: "white",
        }}
      >
        <img
          src={Background} alt="background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
          <Typography sx={{ mt: -2, color: "black", pb: 2 }} variant="body1" align="center">
              Inscrivez-vous dès maintenant <br />  à l'évènement Activate Science<br />Sanofi Marcy l'Etoile du 16 mars 2023
            <br />
        </Typography>
      </Container>
      <Box
        sx={{
          marginTop: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <InputLabel id="test-select-label" required>Civilité</InputLabel>
            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                name="title"
                autoFocus
                value={user.title}
                onChange={handleChange}
            />
            <InputLabel id="test-select-label" required>Adresse email</InputLabel>
          <TextField
            margin="normal"
            fullWidth
            id="emailAddress"
            name="emailAddress"
            autoFocus
            onChange={handleChange}
            value={user.emailAddress}
          />
            <InputLabel id="test-select-label">Numéro de compte Thermofisher</InputLabel>
          <TextField
            margin="normal"
            fullWidth
            name="accountNumber"
            type="text"
            id="accountNumber"
            onChange={handleChange}
            value={user.Account_Number}
          />
            <InputLabel id="test-select-label" required>Prénom</InputLabel>
            <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            name="firstName"
            autoFocus
            value={user.firstName}
            onChange={handleChange}
          />
            <InputLabel id="test-select-label" required>Nom</InputLabel>
            <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            name="lastName"
            autoFocus
            value={user.lastName}
            onChange={handleChange}
          />
            <InputLabel id="test-select-label" required>Entreprise</InputLabel>
            <TextField
            margin="normal"
            required
            fullWidth
            id="company"
            name="company"
            autoFocus
            value={user.Company_name}
            onChange={handleChange}
          />
            <InputLabel id="test-select-label">Téléphone de l'entreprise</InputLabel>
          <TextField
            margin="normal"
            fullWidth
            id="businessPhone"
            name="businessPhone"
            autoFocus
            type="number"
            value={user.businessPhone}
            onChange={handleChange}
          />
            <InputLabel id="test-select-label" required>Addresse 1</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="address1"
            name="address1"
            autoFocus
            type="text"
            value={user.address1}
            onChange={handleChange}
          />
            <InputLabel id="test-select-label" required>Ville</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="city"
            name="city"
            autoFocus
            type="text"
            value={user.city}
            onChange={handleChange}
          />
            <InputLabel id="test-select-label">Adresse 2</InputLabel>
          <TextField
            margin="normal"
            fullWidth
            id="address2"
            name="address2"
            autoFocus
            type="text"
            value={user.address2}
            onChange={handleChange}
          />
            <InputLabel id="test-select-label" required>Code Postal</InputLabel>
          <TextField
              margin="normal"
              required
              fullWidth
              id="zipPostal"
              name="zipPostal"
              autoFocus
              type="text"
              value={user.zipPostal}
              onChange={handleChange}
          />
            <InputLabel id="test-select-label" required>Pays</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="country"
            autoFocus
            name="country"
            type="text"
            value={user.country}
            onChange={handleChange}
          />
            { !user.title || !user.emailAddress || !user.firstName || !user.lastName
                || !user.company || !user.address1 || !user.city || !user.zipPostal   ?
                <Typography sx={{ mt: 2, color: "red", pb: 2 }} variant="body1" align="center">Veuillez remplir les champs obligatoires</Typography>
                : undefined}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={ !user.title || !user.emailAddress || !user.firstName || !user.lastName
                || !user.company || !user.address1 || !user.city || !user.zipPostal || !user.country }
          >
            S'inscrire
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

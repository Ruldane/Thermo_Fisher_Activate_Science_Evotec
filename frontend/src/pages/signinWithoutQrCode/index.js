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
import {FormControl, InputLabel, Select, MenuItem, useMediaQuery} from '@mui/material';

const countries = [
    'Autriche',
    'Belgique',
    'Danemark',
    'Allemagne',
    'Finland',
    'France',
    'Ireland',
    'Italie',
    'Pays-Bas',
    'Norvège',
    'Portugal',
    'Espagne',
    'Suède',
    'Suisse',
    'Royaume-Uni',
];

export default function SigninWithoutQrCode() {
    const {email, noQRCode} = useParams();

    const [user, setUser] = useState("");
    const [country, setCountry] = useState(user?.country === "FR" ? 'France' : "");
    const [open, setOpen] = useState(false);

    const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));
    const matchesMS = useMediaQuery((theme) => theme.breakpoints.up("ms"));
    const matchesLG = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    const matchesLessSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const navigate = useNavigate();
    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
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
                        navigate(`/choice/${email}`);
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
            if(data.country === "FR") {
                setCountry('France');
            }
        } catch (error) {
            console.error(error);
        }
    };
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
                    "country": country,
                    "title": user.title
                }
            );
            if(data?.confirmation) {
                navigate(`/choice/${user.emailAddress}`);
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
        <Container
            component="main"
            maxWidth={matchesMS ? "md": "sm"}
            sx={{
                background:"rgba(255, 255, 255, 0.2)",
                borderRadius:"16px",
                boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter:"blur(5px)",
                WebkitBackdropFilter:"blur(5px)",
                border:"1px solid rgba(255, 255, 255, 0.3)"
            }}
        >
            <CssBaseline />
            <Container
                maxWidth={matchesMS ? "md": "sm"}
                fixed
                sx={{
                    position: "fixed",
                    zIndex: 99999,
                    marginLeft: "-0.98rem",
                    top: 0,

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
                {matchesSM ? (
                    <Typography sx={{ mt: -2, color: "black", pb: 2 }} variant="h5" align="center">
                        Inscrivez-vous dès maintenant  à l'évènement Activate Science Evotec Toulouse du 04 avril 2023
                        <br />
                    </Typography>
                )  :            <Typography sx={{ mt: -2, color: "black", pb: 2 }} variant="body1" align="center">
                    Inscrivez-vous dès maintenant <br />  à l'évènement Activate Science<br />Evotec Toulouse du 04 avril 2023
                    <br />
                </Typography>}
            </Container>
            <Box
                sx={{
                    marginTop: matchesMS ? 40 : matchesSM ? 30 : matchesLessSM ? 32 : 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 1
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate       sx={{
                    marginTop: matchesMS ? 40 : matchesSM ? 30 : matchesLessSM ? 32 : 0,
                    display: matchesSM ?  "flex" : undefined,
                    flexDirection: matchesSM ? "column" : undefined,
                    justifyContent: matchesSM ? "center" : undefined,
                    alignItems: matchesSM ? "center" : undefined,
                    width: "100%",
                    mt: 1
                }}
                >
                    <InputLabel sx={{ color: 'black', ontWeight: 'bold', marginLeft:  matchesMS ? "10%" : undefined,  marginRight: matchesMS ? 'auto' : undefined}} id="test-select-label" required>Civilité</InputLabel>
                    <TextField
                        margin="normal"
                        required
                        id="title"
                        name="title"
                        autoFocus
                        value={user?.title}
                        onChange={handleChange}
                        fullWidth={!matchesMS}
                        sx={{width: matchesMS ? "80%" : undefined}}
                    />
                    <InputLabel sx={{ color: 'black', ontWeight: 'bold', marginLeft:  matchesMS ? "10%" : undefined,  marginRight: matchesMS ? 'auto' : undefined}} id="test-select-label" required>Adresse email</InputLabel>
                    <TextField
                        margin="normal"
                        fullWidth={!matchesMS}
                        sx={{width: matchesMS ? 0.8 : undefined}}
                        id="emailAddress"
                        name="emailAddress"
                        autoFocus
                        onChange={handleChange}
                        value={user?.emailAddress}
                    />
                    <InputLabel sx={{ color: 'black', ontWeight: 'bold', marginLeft:  matchesMS ? "10%" : undefined,  marginRight: matchesMS ? 'auto' : undefined}} id="test-select-label">Numéro de compte Thermofisher</InputLabel>
                    <TextField
                        margin="normal"
                        fullWidth={!matchesMS}
                        sx={{width: matchesMS ? 0.8 : undefined}}
                        name="accountNumber"
                        type="text"
                        id="accountNumber"
                        onChange={handleChange}
                        value={user?.Account_Number}
                    />
                    <InputLabel sx={{ color: 'black', ontWeight: 'bold', marginLeft:  matchesMS ? "10%" : undefined,  marginRight: matchesMS ? 'auto' : undefined}} id="test-select-label" required>Prénom</InputLabel>
                    <TextField
                        margin="normal"
                        required
                        fullWidth={!matchesMS}
                        sx={{width: matchesMS ? 0.8 : undefined}}
                        id="firstName"
                        name="firstName"
                        autoFocus
                        value={user?.firstName}
                        onChange={handleChange}
                    />
                    <InputLabel sx={{ color: 'black', ontWeight: 'bold', marginLeft:  matchesMS ? "10%" : undefined,  marginRight: matchesMS ? 'auto' : undefined}} id="test-select-label" required>Nom</InputLabel>
                    <TextField
                        margin="normal"
                        required
                        fullWidth={!matchesMS}
                        sx={{width: matchesMS ? 0.8 : undefined}}
                        id="lastName"
                        name="lastName"
                        autoFocus
                        value={user?.lastName}
                        onChange={handleChange}
                    />
                    <InputLabel sx={{ color: 'black', ontWeight: 'bold', marginLeft:  matchesMS ? "10%" : undefined,  marginRight: matchesMS ? 'auto' : undefined}} id="test-select-label" required>Entreprise</InputLabel>
                    <TextField
                        margin="normal"
                        required
                        fullWidth={!matchesMS}
                        sx={{width: matchesMS ? 0.8 : undefined}}
                        id="company"
                        name="company"
                        autoFocus
                        value={user?.Company_name}
                        onChange={handleChange}
                    />
                    <InputLabel sx={{ color: 'black', ontWeight: 'bold', marginLeft:  matchesMS ? "10%" : undefined,  marginRight: matchesMS ? 'auto' : undefined}} id="test-select-label">Téléphone de l'entreprise</InputLabel>
                    <TextField
                        margin="normal"
                        fullWidth={!matchesMS}
                        sx={{width: matchesMS ? 0.8 : undefined}}
                        id="businessPhone"
                        name="businessPhone"
                        autoFocus
                        type="number"
                        value={user?.businessPhone}
                        onChange={handleChange}
                    />
                    <InputLabel sx={{ color: 'black', ontWeight: 'bold', marginLeft:  matchesMS ? "10%" : undefined,  marginRight: matchesMS ? 'auto' : undefined}} id="test-select-label" required>Adresse 1</InputLabel>
                    <TextField
                        margin="normal"
                        required
                        fullWidth={!matchesMS}
                        sx={{width: matchesMS ? 0.8 : undefined}}
                        id="address1"
                        name="address1"
                        autoFocus
                        type="text"
                        value={user?.address1}
                        onChange={handleChange}
                    />

                    <InputLabel sx={{ color: 'black', ontWeight: 'bold', marginLeft:  matchesMS ? "10%" : undefined,  marginRight: matchesMS ? 'auto' : undefined}} id="test-select-label" required>Ville</InputLabel>
                    <TextField
                        margin="normal"
                        required
                        fullWidth={!matchesMS}
                        sx={{width: matchesMS ? 0.8 : undefined}}
                        id="city"
                        name="city"
                        autoFocus
                        type="text"
                        value={user?.city}
                        onChange={handleChange}
                    />
                    <InputLabel sx={{ color: 'black', ontWeight: 'bold', marginLeft:  matchesMS ? "10%" : undefined,  marginRight: matchesMS ? 'auto' : undefined}} id="test-select-label" required>Adresse 2</InputLabel>
                    <TextField
                        margin="normal"
                        fullWidth={!matchesMS}
                        sx={{width: matchesMS ? 0.8 : undefined}}
                        id="address2"
                        name="address2"
                        autoFocus
                        type="text"
                        value={user?.address2}
                        onChange={handleChange}
                    />
                    <InputLabel sx={{ color: 'black', ontWeight: 'bold', marginLeft:  matchesMS ? "10%" : undefined,  marginRight: matchesMS ? 'auto' : undefined}} id="test-select-label" required>Code Postal</InputLabel>
                    <TextField
                        margin="normal"
                        required
                        fullWidth={!matchesMS}
                        sx={{width: matchesMS ? 0.8 : undefined}}
                        id="zipPostal"
                        name="zipPostal"
                        autoFocus
                        type="text"
                        value={user?.zipPostal}
                        onChange={handleChange}
                    />

                    <InputLabel sx={{ color: 'black', ontWeight: 'bold', marginLeft:  matchesMS ? "10%" : undefined,  marginRight: matchesMS ? 'auto' : undefined}} id="test-select-label" required>Pays</InputLabel>
                    <FormControl variant="outlined" sx={{  width: matchesMS ? "80%" : "100%", mt: 1 }}>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={country}
                            onChange={handleChangeCountry}
                        >
                            {countries.sort().map((country) => (
                                <MenuItem
                                    key={country}
                                    value={country}
                                >
                                    {country}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    { !user.title || !user.emailAddress || !user.firstName || !user.lastName
                    || !user.company || !user.address1 || !user.city || !user.zipPostal   ?
                        <Typography sx={{ mt: 2, color: "red", pb: 2 }} variant="body1" align="center">Veuillez remplir les champs obligatoires</Typography>
                        : undefined}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, width: matchesMS? "80%" : undefined}}
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

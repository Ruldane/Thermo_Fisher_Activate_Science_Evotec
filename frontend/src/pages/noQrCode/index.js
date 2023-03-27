import * as React from "react";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useMediaQuery} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Background from '../../images/Background.webp';

const NoQrCode = () => {
    const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));
    const matchesLessSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [noQRCode, setNoQRCode] = useState("noooooooooo");
    const submitHandler = () => {
        setLoading(true);
        if (isValidEmail(email)) {
            setLoading(false);
            navigate(`/signin/no-qrcode/${email}`);
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
                }}
            />
            <Typography sx={{ mt: 3 }} align="center" variant={matchesSM? "body1" : "body2"}>
                Veuillez rentrer votre email. Vous serez automatiquement redirigé vers une page sans QR-code après avoir validé le formulaire.
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
                    Validez votre formulaire
                </Button>
            </Box>
            <Typography sx={{ mt: 3 }} align="center" variant={matchesSM ? "body1" : "body2"}>
                Thermo Fisher Scientific © 2023
            </Typography>
        </Container>
    )
}

export default NoQrCode;
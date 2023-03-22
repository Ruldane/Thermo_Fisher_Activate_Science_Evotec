import {useNavigate, useParams} from "react-router-dom";
import "./style.css";
import * as React from "react";
import {useEffect} from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useMediaQuery} from "@mui/material";
import Background from "../../images/Background.webp"
import {useDispatch, useSelector} from "react-redux";
import {setRoleEvent} from "../../actions/roleActions";

const Choice = () => {
    const { email } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));
    const roleEvent = useSelector(state => state.role);
    const sendToAdmin = () => {
        dispatch(setRoleEvent("admin"));
        navigate(`../admin/${email}/`)
    }
    const sendToSupplier = () => {
        dispatch(setRoleEvent("supplier"));
        navigate(`../choiceSupplier/${email}/`)
    }

    useEffect(() => {
        const role = JSON.parse(localStorage.getItem("role"));
        if (role && role === "admin") {
            navigate(`../admin/${email}/`)
        } else if (role && role === "supplier") {
            navigate(`../choiceSupplier/${email}/`)
        }
    }, []);



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
                    onClick={sendToSupplier}
                    color="secondary"
                    sx={{ width: "50%" }}
                >
                    Fournisseur
                </Button>
                <Button
                    variant="contained"
                    onClick={sendToAdmin}
                    sx={{ width: "50%" }}
                >
                    Organisateur
                </Button>
            </Stack>
        </Container>
    );
};

export default Choice;

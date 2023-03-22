import {Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import RingLoader from "react-spinners/RingLoader";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useMediaQuery} from "@mui/material";
import Alert from "@mui/material/Alert";
import Background from '../../images/Background.webp'
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import {removeRoleEvent} from "../../actions/roleActions";
import {useDispatch} from "react-redux";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function AdminForm() {
    const userInfos = {
        emailAddress: "",
        accountNumber: "",
        firstName: "",
        lastName: "",
        company: "",
        businessPhone: "",
        address1: "",
        address2: "",
        zipPostal: "",
        city: "",
        country: "",
    };

    // get email from url using react-router
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useParams();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(userInfos);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [submit, setSubmit] = useState(false);

    const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));

    const getUserByEmail = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/getUserByEmail`,
                {"email": email},
            );
            setUser(data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    useEffect(() => {
        getUserByEmail();
    }, [email]);

    const {
        emailAddress,
        accountNumber,
        firstName,
        lastName,
        company,
        businessPhone,
        address1,
        address2,
        zipPostal,
        city,
        country,
    } = user;

    const handleRegisterChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const RegisterValidation = Yup.object({
        first_name: Yup.string()
            .required("What's your First name?")
            .min(2, "First name must be between 2 and 16 characters")
            .max(16, "First name must be between 2 and 16 characters")
            .matches(
                /^[aA-zZ]+$/,
                "First name can't contain special characters and numbers"
            ),

        last_name: Yup.string()
            .required("What's your Last name?")
            .min(2, "Last name must be between 2 and 16 characters")
            .max(16, "Last name must be between 2 and 16 characters")
            .matches(
                /^[aA-zZ]+$/,
                "Last name can't contain special characters and numbers"
            ),

        emailAddress: Yup.string()
            .required(
                "You will need this to register. Please enter your email address"
            )
            .email("Invalid email address"),

        // password: Yup.string()
        //   .required(
        //     "Enter a combunation of at least six numbers, letters and punctuation marks (like ! and &)."
        //   )
        //   .min(6, "Password must be at least 6 characters")
        //   .max(36, "Password can't be longer than 36 characters"),
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const registerSubmit = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/registerActivateScience`,
                {
                    "emailAddress": emailAddress,
                    "accountNumber": accountNumber ? accountNumber : "no number account",
                    "firstName": firstName,
                    "lastName": lastName,
                    "company": company,
                    "businessPhone": businessPhone ? businessPhone : "no phone number",
                    "address1": address1,
                    "city": city,
                    "address2": address2 ? address2 : "no address 2",
                    "zipPostal": zipPostal,
                    "country": country,
                    "title": "title"
                }
            );
            if(data?.confirmation) {
                setSubmit(true)
                setLoading(false)
                setOpen(true);
            }
        } catch (error) {
            setLoading(false)
            console.error(error);
            return;
        }
    };

    const deleteRoleAdmin = () => {
        dispatch(removeRoleEvent());
        navigate(`../choice/${email}`)
    }

    useEffect(() => {
        let timer1
        if (!submit) {
            return
        } else if(submit && open) {
            timer1 = setTimeout(function() {
                setOpen(false) // runs first
                window.location.replace('https://www.fishersci.fr/fr/fr/home.html')
            }, 10000)

        } else if(submit &&!open) {
            // window.location.replace('https://www.fishersci.fr/fr/fr/home.html');
            // console.log("close")
        }
        return () => {
            clearTimeout(timer1);
        };
    },[submit, open])

    useEffect(() => {
        if(trigger) {
            window.location.replace('https://www.fishersci.fr/fr/fr/home.html')
        }
    },[trigger])

    return (
        <div>

            {loading ? (
                <Container maxWidth="md" sx={{ mb: 5 }}>
                    <img
                        src={Background}
                        alt="Background"
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
                        variant="body1"
                        align="center"
                    >
                        Sanofi Marcy l'Etoile Activate Science.
                    </Typography>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                </Container>
            ) : (
                <Container maxWidth="md" sx={{ mb: 5 }}>
                    <img
                        src={Background}
                        alt="Background"
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
                        variant="body1"
                        align="center"
                    >
                        Sanofi Marcy l'Etoile Activate Science.
                    </Typography>
                    <Typography sx={{ color: "black" }} variant="body1" align="center">
                        <Button onClick={deleteRoleAdmin}> Cliquez ici</Button> si vous n'êtes pas l'organisateur.
                    </Typography>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            emailAddress,
                            accountNumber,
                            firstName,
                            lastName,
                            company,
                            businessPhone,
                            address1,
                            address2,
                            zipPostal,
                            city,
                            country,
                        }}
                        //validationSchema={RegisterValidation}
                        onSubmit={() => {
                            registerSubmit();
                        }}
                    >
                        {(formik) => (
                            <Form className="register_form">
                                <div className="reg_btn_wrapper">
                                    {!open && (
                                        <button className="blue_btn open_signup" disabled={open}>
                                            Validez la présence de {firstName} {lastName}
                                        </button>
                                    )}
                                </div>
                                <RingLoader color="#18f6f2" loading={loading} size={150} />
                                {error && <div className="error_text">{error}</div>}
                                {error && <div className="success_text">{success}</div>}
                            </Form>
                        )}
                    </Formik>
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                        setTrigger(true)
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            variant="filled" severity="success"
                        >
                            Merci d'avoir enregistré la présence de {`${firstName} ${lastName}`}  à cet évènement.<br/>
                            Veuillez fermer cette fenêtre et scanner le QR code du client suivant. <br />
                            <Button  sx={{color:"white"}} onClick={() => {
                                setOpen(false);
                                setTrigger(true)
                            }}>
                                Fermer cette fenêtre
                            </Button>
                        </Alert>
                    </Collapse>
                </Container>
            )}
        </div>
    );
}
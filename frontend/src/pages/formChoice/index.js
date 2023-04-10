import {Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import * as Yup from "yup";
import RingLoader from "react-spinners/RingLoader";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./style.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {InputLabel, useMediaQuery} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import MuiAlert from '@mui/material/Alert';
import Background from '../../images/Background.webp'
import Button from "@mui/material/Button";
import {removeSupplier} from "../../actions/supplierActions";
import LinearProgress from "@mui/material/LinearProgress";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ChoiceForm() {
    const [open, setOpen] = useState(false);
    // get email and supplier from url using react-router
    const { email } = useParams();
    const { supplier } = useParams();

    const userInfos = {
        emailAddress: "",
        Account_Number: "",
        firstName: "",
        lastName: "",
        company: "",
        businessPhone: "",
        address1: "",
        address2: "",
        zipPostal: "",
        city: "",
        country: "",
        comments: "",
        quote: "",
    };

    const [user, setUser] = useState(userInfos);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("hello");
    const [loading, setLoading] = useState(false);
    const [requestType, setRequestType] = useState("");
    const [trigger, setTrigger] = useState(false);
    const [submit, setSubmit] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));

    const handleChange = (event) => {
        setRequestType(event.target.value);
    };

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

    useEffect(() => {
        getUserByEmail();
    }, [email]);

    useEffect(() => {
        if(user?.Account_Number) {
            setUser({...user, comments: ""});
        }
    }, []);


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

    const {
        emailAddress,
        firstName,
        lastName,
        company,
        businessPhone,
        address1,
        address2,
        zipPostal,
        city,
        country,
        comments,
        Account_Number
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

    const deleteSupplier = () => {
        dispatch(removeSupplier());
        navigate(`../choiceSupplier/${email}`)
    }

    const registerSubmit = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/submitActivateScience`,
                { "emailAddress": emailAddress, "accountNumber": Account_Number ? Account_Number : "no account number",
                    "firstName": firstName, "lastName": lastName, "company": company,
                    "businessPhone": businessPhone ? businessPhone : "no business phone", "address1": address1,
                    "city": city, "address2": address2 ? address2 : "no address 2", "zipPostal": zipPostal, "country": country,
                    "comments": comments ? comments : "no comment", "supplierEvent": supplier, "requestType": requestType},
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

    return (
        <>


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
                       L'Activate Science Evotec Toulouse.
                    </Typography>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                </Container>
            ) : (
                <Container maxWidth="md" sx={{ mb: 5, mt: 1 }}>
                    <img
                        src={Background}
                        alt="background"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                            marginBottom: "-2rem",
                        }}
                    />
                    <Typography sx={{ mt: 5, color: "black" }} variant="body1" align="center">
                        Fournisseur: {supplier.replace(/[^a-zA-Z ]/g, "")} <br />
                        <Button onClick={deleteSupplier}>
                            Cliquez ici
                        </Button>
                        pour changer de fournisseur.
                    </Typography>
                    <Typography sx={{ mt: 1, color: "black" }} variant="body1" align="center">
                        Client: {firstName} {lastName}
                    </Typography>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            emailAddress,
                            Account_Number,
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
                                <Box sx={{ width: "90%", mt: 2, mb: 2 }}>
                                    <FormControl fullWidth>
                                        <InputLabel required>Requête</InputLabel>
                                        <Select
                                            value={requestType}
                                            label="Request Type"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Demande de prix">Prix</MenuItem>
                                            <MenuItem value="Demande de délai">Délai(s)</MenuItem>
                                            <MenuItem value="Demande technique">
                                                Information technique
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <textarea
                                    placeholder={`Commentaire(s)`}
                                    maxLength="250"
                                    name="comments"
                                    onChange={handleRegisterChange}
                                    style={{
                                        width: "90%",
                                        height: "150px",
                                        padding: "12px 20px",
                                        boxSizing: "border-box",
                                        border: "2px solid #CCC",
                                        borderRadius: "4px",
                                        backgroundColor: "#f8f8f8",
                                        fontSize: "16px",
                                        resize: "none",
                                    }}
                                ></textarea>
                                {!requestType  ?
                                    <Typography sx={{ mt: 2, color: "red"}} variant="body1" align="center">* Vous devez remplir les champs obligatoires</Typography>
                                    : undefined}
                                <div className="reg_btn_wrapper">
                                    {requestType ? (
                                        <button    disabled={!requestType} className={!requestType ? "grey_btn" : "blue_btn open_signup"} >
                                            Validez votre demande.
                                        </button>
                                    ) : null}

                                </div>
                                <RingLoader color="#18f6f2" loading={loading} size={150} />
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
                            Merci d'avoir participé à Sanofi Marcy l'Etoile Activate Science. {`${firstName} ${lastName}`}
                            <br/>
                            Veuillez fermer cette fenêtre et scanner le QR code du client suivant. <br />
                            <Button  sx={{color:"white"}} onClick={() => {
                                setOpen(false);
                                setTrigger(true)
                            }}>
                                Fermez cette fenêtre
                            </Button>
                        </Alert>
                    </Collapse>
                </Container>
            )
            }
        </>

    );
}

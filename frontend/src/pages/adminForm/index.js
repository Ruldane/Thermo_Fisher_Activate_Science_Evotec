import {Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import RingLoader from "react-spinners/RingLoader";
import {useParams} from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useMediaQuery} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Background from '../../images/Background.png'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminForm() {
  // get email from url using react-router
    const [open, setOpen] = useState(false);
  const { email } = useParams();
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));

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
  }

  useEffect(() => {
    getUserByEmail();
  }, [email]);

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

  const [user, setUser] = useState(userInfos);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
          setOpen(true);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <div>
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
                <button className="blue_btn open_signup">
                  Validez la présence de {firstName} {lastName}
                </button>
              </div>
              <RingLoader color="#18f6f2" loading={loading} size={150} />
              {error && <div className="error_text">{error}</div>}
              {error && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Merci d'être venu participé à Sanofi Marcy l'Etoile Activate Science {`${firstName} ${lastName}`}
              </Alert>
          </Snackbar>
      </Container>
    </div>
  );
}

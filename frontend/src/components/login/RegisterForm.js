import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";
import RingLoader from "react-spinners/RingLoader";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ setVisible }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    marketingCountry: "",
    locale: "",
    language: "",
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
    marketingCountry,
    locale,
    language,
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

  const registerSubmit = async () => {
    let formdata = new FormData();
    formdata.append("emailAddress", emailAddress);
    formdata.append("accountNumber", accountNumber);
    formdata.append("firstName", firstName);
    formdata.append("lastName", lastName);
    formdata.append("company", company);
    formdata.append("businessPhone", businessPhone);
    formdata.append("address1", address1);
    formdata.append("city", city);
    formdata.append("address2", address2);
    formdata.append("zipPostal", zipPostal);
    formdata.append("country", country);
    formdata.append("marketingCountry", marketingCountry);
    formdata.append("locale", locale);
    formdata.append("language", language);

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://ebiz.thermofisher.com/EU/NLSU/2.0/index.php?action=submitInscriptionActivateScience",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  // const registerSubmit = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       `${process..env.REACT_APP_BACKEND_URL}/register`,
  //       {
  //         emailAddress,
  //         accountNumber,
  //         firstLame,
  //         lastName,
  //         company,
  //         businessPhone,
  //         address1,
  //         address2,
  //         zipPostal,
  //         city,
  //         country,
  //         marketingCountry,
  //         locale,
  //         language,
  //       }
  //     );
  //     setError("");
  //     setSuccess(data.message);
  //     // remove data.message from data
  //     const { message, ...rest } = data;
  //     setTimeout(() => {
  //       dispatch({ type: "LOGIN", payload: rest });
  //       Cookies.set("user", JSON.stringify(rest));
  //       navigate("/");
  //     }, 3000);
  //   } catch (error) {
  //     setLoading(false);
  //     setSuccess("");
  //     setError(error.response.data.message);
  //   }
  // };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
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
            marketingCountry,
            locale,
            language,
          }}
          //validationSchema={RegisterValidation}
          onSubmit={() => {
            registerSubmit();
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="your email address"
                  name="emailAddress"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="number"
                  placeholder="Your account number"
                  name="accountNumber"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="number"
                  placeholder="Your phone number"
                  name="businessPhone"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Your company"
                  name="company"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Address 1"
                  name="address1"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Address 2"
                  name="address2"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Postal Code"
                  name="zipPostal"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Country"
                  name="country"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Marketing Country"
                  name="marketingCountry"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Locale"
                  name="locale"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Language"
                  name="language"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span>
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">
                  Sign Up for this event!
                </button>
              </div>

              <RingLoader color="#18f6f2" loading={loading} size={150} />
              {error && <div className="error_text">{error}</div>}
              {error && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

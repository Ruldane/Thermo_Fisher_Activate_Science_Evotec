import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CheckIfUserPreRegister = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState(null)
    const [foundUser, setFoundUser] = useState(null)


  useEffect(() => {
      const getUserByEmail = async () => {
          try {
              const { data } = await axios.post(
                  `${process.env.REACT_APP_BACKEND_URL}/CheckIfUserPreRegister`);
              data.elements.map(element => {
                      if(element['fieldValues'].some(element => element.value === email)){
                          navigate(`/qrcode/${email}`);
                      }
                  }
              );
          } catch (error) {
              console.error(error);
          }
      };
      getUserByEmail();

  }, []);

  // useEffect(() => {
  //     if(formRegister?.elements) {
  //         console.log(formRegister);
  //
  //     }
  // }, []);
  //
  // console.log(foundUser);
  //
  //   if (foundUser) {
  //       navigate(`/qrcode/${email}`);
  //   }

  // if (user?.Account_Number) {
  //   navigate(`/qrcode/${email}`);
  // } else {
  //   navigate("/signin");
  // }



  return <div></div>;
};
export default CheckIfUserPreRegister;

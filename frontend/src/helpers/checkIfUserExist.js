import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CheckIfUserExist = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

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



  if (user?.Account_Number) {
    navigate(`/qrcode/${email}`);
  } else {
    navigate("/signin");
  }

  return <div></div>;
};
export default CheckIfUserExist;

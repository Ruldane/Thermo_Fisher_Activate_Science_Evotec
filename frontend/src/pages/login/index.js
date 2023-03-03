import "./style.css";
import LoginForm from "../../components/login/LoginForm";
import { useState } from "react";

export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <LoginForm setVisible={setVisible} />
    </>
  );
}

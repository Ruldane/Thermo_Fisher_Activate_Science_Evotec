import Login from "./pages/login";
import Profile from "./pages/profile";
import {Route, Routes, BrowserRouter, HashRouter, Link} from "react-router-dom";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import { useSelector } from "react-redux";
import QRCodeImage from "./components/QRCode/QRCodeImage";
import ChoiceForm from "./pages/formChoice";
import Choice from "./pages/choice";
import AdminForm from "./pages/adminForm";
import SelectSupplier from "./pages/selectSupplier";
import SignIn from "./pages/signIn";
import CheckIfUserExist from "./helpers/checkIfUserExist";
import './App.css';
import CheckIfUserPreRegister from "./helpers/checkIfUserRegister";
function App() {
  // const get = async () => {
  //   const res = await fetch('http://localhost:8000');
  //   console.log(res);
  // };
  // get();
  const { user } = useSelector((state) => ({ ...state }));
  return (
      <BrowserRouter basename="/activate-science/20481">
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/qrcode/:email" element={<QRCodeImage />} exact />
        <Route path="/signin/:email" element={<SignIn />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/choice/:email" element={<Choice />} exact />
        <Route
          path="/choiceSupplier/:email"
          element={<SelectSupplier />}
          exact
        />
        <Route path="/admin/:email" element={<AdminForm />} exact />
        <Route
          path="/supplier/:email/:supplier"
          element={<ChoiceForm />}
          exact
        />
        <Route
          path="/checkIfUserExist/:email"
          element={<CheckIfUserExist />}
          exact
        />
          <Route
              path="/checkIfUserPreRegister/:email"
              element={<CheckIfUserPreRegister />}
              exact
          />
      </Routes>
      </BrowserRouter>
  );
}

export default App;

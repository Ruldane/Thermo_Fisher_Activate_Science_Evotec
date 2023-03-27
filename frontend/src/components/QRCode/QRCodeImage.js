import "./style.css";
import QRCode from "qrcode";
import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {useMediaQuery} from "@mui/material";
import Button from "@mui/material/Button";
import Background from '../../images/Background.webp'

const QRCodeImage = () => {
  let { email } = useParams();
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [url, setUrl] = useState(`https://www.fishersci.eu/activate-science/20481/choice/${email}`);
  const [qr, setQr] = useState("");

  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "#335383FF",
          light: "#EEEEEEFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        setQr(url);
      }
    );
  };

  useEffect(() => {
    GenerateQRCode();
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
      <Typography
        sx={{ mt: 5, mb: 2, color: "black" }}
        variant={matchesSM ? "h3" : "body1"}
        align="center"
      >
        Merci de vous être pré-enregistré(e). <br />
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 2 }} align="center">
        Téléchargez et sauvegardez votre QR code <br />
        qui vous sera demandé lors de l'événement.
      </Typography>

      {qr && (
        <>
          <img src={qr} alt="qrCode" className="qr_code_image" />
          <br></br>
          <Button
            href={qr}
            download="qrcode.png"
            variant="contained"
            sx={{ mt: -2 }}
            fullWidth={!matchesSM}
            fullWidth
          >
            Téléchargez votre QR code
          </Button>
        </>
      )}
    </Container>
  );
};

export default QRCodeImage;

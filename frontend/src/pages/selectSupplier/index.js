import * as React from "react";
import { createTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Background from '../../images/Background.png'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const suppliers = [
  "AGILENT BIOTECH",
  "CORNING",
  "CYTIVA",
  "DWK LIFE SCIENCES",
  "EPPENDORF",
  "PALL",
  "PROTEINTECH",
  "SARTORIUS",
  "THERMO BID AND GSG",
  "THERMO LE - LABORATORY EQUIPMENT",
  "THERMO LPE - LABORATORY PLASTICS",
];
const theme = createTheme();

function getStyles(name, supplier, theme) {
  return {
    fontWeight:
      supplier.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SelectSupplier = () => {
  const { email } = useParams();
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [supplier, setSupplier] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSupplier(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
        Veuillez sélectionner le fournisseur <br />
        dans la liste ci-dessous.
      </Typography>
      <FormControl sx={{ width: "100%", mt: 3 }}>
        <Select
          displayEmpty
          value={supplier}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Sélectionnez le fournisseur</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Sélectionnez le fournisseur</em>
          </MenuItem>
          {suppliers.sort().map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, supplier, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {supplier.length > 0 && (
        <>
          <Button
            sx={{ mt: 1 }}
            href={`../supplier/${email}/${supplier}`}
            variant="contained"
          >
            Validez votre sélection.
          </Button>
        </>
      )}
    </Container>
  );
};

export default SelectSupplier;

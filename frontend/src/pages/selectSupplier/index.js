import * as React from "react";
import {useEffect, useState} from "react";
import {createTheme} from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Background from '../../images/Background.webp'
import {setSupplierEvent} from "../../actions/supplierActions";
import {removeRoleEvent} from "../../actions/roleActions";

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
    "ANSELL",
    "ASECOS",
    "BRADY",
    "BEL-ART",
    "CONTEC",
    "CORNING",
    "DUPONT",
    "CYTIVA",
    "EPPENDORF",
    "KIMBERLY CLARK",
    "SARTORIUS",
    "THERMO BID AND GSG",
    "THERMO LCD - LABORATORY CHEMICALS",
    "THERMO LE - LABORATORY EQUIPMENT",
    "THERMO LPE - LABORATORY PLASTICS",
    "UNITY LAB SERVICES",
    "DWK Life Sciences",
    "JULABO",
    "THERMO LPD",
    "STERIS",
    "Fisher Scientific e-bus"
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useParams();
    const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));
    const [supplier, setSupplier] = useState([]);
    // get supplier from redux store
    const supplierEvent = useSelector(state => state.supplier);


    const onSubmitHandler = () => {
        // Dispatch the setSupplier action
        const supplierEventJoin = supplier.join(",");
        const supplierEvent = supplierEventJoin.split(",");
        dispatch(setSupplierEvent(supplierEvent[0]));
        navigate(`../supplier/${email}/${supplier}`)
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSupplier(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const deleteRoleSupplier = () => {
        dispatch(removeRoleEvent());
        navigate(`../choice/${email}`)
    }


    useEffect(() => {
        // if supplierEvent is not empty redirect to final form
        if(supplierEvent.supplier) {
            const supplierEventRedirect = supplierEvent.supplier
            navigate(`../supplier/${email}/${supplierEventRedirect}`)
        }
    },[supplierEvent])


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
            <Typography sx={{ color: "black" }} variant="body1" align="center">
                <Button onClick={deleteRoleSupplier}> Cliquez ici</Button> si vous n'êtes pas un un fournisseur.
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
                            {name.toUpperCase()}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {supplier.length > 0 && (
                <>
                    <Button
                        sx={{ mt: 1 }}
                        onClick={onSubmitHandler}
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

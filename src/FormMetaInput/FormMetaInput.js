import { Grid, TextField, MenuItem } from "@mui/material";


const countries = ["India", "USA", "UK", "Germany"];
const brands = ["Nike", "Adidas", "Puma", "Reebok"];

const FormMetaInput = ({ formName,
    setFormName,
    country,
    setCountry,
    brand,
    setBrand,
}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    fullWidth
                    label="Form Name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    select
                    fullWidth
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    // size="small"
                    sx={{
                        width: { xs: "100%", sm: 220 }, // default width on sm+; full width on xs
                        minWidth: 160,
                    }}

                >
                    {countries.map((c) => (
                        <MenuItem key={c} value={c}>
                            {c}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    select
                    fullWidth
                    disabled={country == ""}
                    label="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    // size="small"
                    sx={{
                        width: { xs: "100%", sm: 220 }, // default width on sm+; full width on xs
                        minWidth: 160,
                    }}

                >
                    {country != "" && brands.map((b) => (
                        <MenuItem key={b} value={b}>
                            {b}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
    )
}
export default FormMetaInput;
import { DisplaySettings } from "@mui/icons-material";
import { useState } from "react";
import { Box, Button, Card, CardContent, Grid, TextField, Typography, MenuItem } from "@mui/material";
import style from './style.module.css'
import FormMetaInput from "../FormMetaInput/FormMetaInput";
import FormBuild from "../FormBuilder/FormBuilder";
import config from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const countries = [ "USA", "Australia"];
const brands = ['A','B','C'];

const CreateForm = () => {
    const [formName, setFormName] = useState('');
    const [country, setCountry] = useState('');
    const [brand, setBrand] = useState('');
    const [schema,setSchema] = useState({ components: []});
    const navigate = useNavigate();

    async function saveForm(payload) {
        try {
            console.log(payload);
            await axios.post(config.apiUrl + '/form/create', payload);
            navigate('/forms')
        }
        catch (e) {
            console.log(e);
        }
    }
    function handleSave(e) {
        e.preventDefault();

        // simple validation check
        if (!formName || !country || !brand) {
            alert("Please fill all required fields");
            return;
        }
        saveForm({ name:formName, components:schema.components, country, brand });

    }

    return (
        <Box className={style.container} component="form" onSubmit={handleSave} >

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
                        {brands.map((b) => (
                            <MenuItem key={b} value={b}>
                                {b}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            {/* <FormBuild /> */}
            <Card >
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Form Builder
                    </Typography>
                    <FormBuild
                    schema={schema} setSchema={setSchema} 
                    />
                </CardContent>
            </Card>
            <Box display="flex" gap={2}>
                <Button variant="contained" color="primary" type="submit">
                    Save Form
                </Button>
                <Button variant="outlined" color="secondary">
                    Cancel
                </Button>
            </Box>
        </Box>
    )
}

export default CreateForm;
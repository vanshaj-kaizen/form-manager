import axios from "axios";
import { Formio } from "formiojs";
import { Box, Button, Card, CardContent, Grid, TextField, Typography, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";
import style from './style.module.css'

const countries = ["USA", "Australia"];
const brands = ['A', 'B', 'C'];


const FormBuild = ({ isEdit }) => {
    const [formName, setFormName] = useState('');
    const [country, setCountry] = useState('');
    const [brand, setBrand] = useState('');
    const [schema, setSchema] = useState({ components: [] });
    const { id } = useParams(); // form id from route param
    const [formFetched, setFormFetched] = useState(false);

    const navigate = useNavigate();
    const builderRef = useRef()


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

    async function editFrom(payload) {
        try {
            console.log(payload);
            await axios.put(config.apiUrl + '/form/edit', payload);
            navigate('/forms')
        }
        catch (e) {
            console.log(e);
        }
    }

    function validation(e) {
        e.preventDefault();

        if (!formName || !country || !brand) {
            alert("Please fill all required fields");
            return;
        }
        handleSave();
    }

    function handleSave() {

        if (isEdit) {
            console.log('edit')
            editFrom({ name: formName, schema, country, brand, id })
        }
        else { saveForm({ name: formName, schema: schema, country, brand }); }

    }

    const fetchForm = async () => {
        try {
            const res = await axios.get(`${config.apiUrl}/form/${id}`);
            console.log(res);
            setFormName(res?.data?.name);
            setCountry(res?.data?.country);
            setBrand(res?.data?.brand);
            setSchema(res?.data?.form_schema);
            setFormFetched(!formFetched)
            // setFormSchema({
            //     name: res.data.name, country: res.data.country,
            //     brand: res.data.brand, components: res.data.form_schema
            // }); // { name, country, brand, components }
        } catch (err) {
            console.log("Failed to load form");
        }
    };


    useEffect(() => {
        if (builderRef.current) {
            Formio.builder(builderRef.current, schema).then((builder) => {
                console.log("Builder ready:", builder);

                const updateSchema = () => {
                    setSchema({ ...builder.schema });
                    console.log("Updated schema:", builder.schema);
                };

                builder.on("change", updateSchema);

                // initial schema
                // updateSchema();
            });
        }
    }, [formFetched]);

    useEffect(() => {
        if (isEdit) {
            fetchForm()
        }
    }, [])
    return (
        <Box className={style.container} component="form" onSubmit={validation} >

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
                    {isEdit ? <>{formFetched ? <div ref={builderRef}></div> : <div></div>}</> : <div ref={builderRef}></div>}

                </CardContent>
            </Card>
            <Box display="flex" gap={2}>
                <Button variant="contained" color="primary" type="submit">
                    {isEdit ? 'Update Form' : 'Save Form'}
                </Button>
                {/* <Button variant="outlined" color="secondary">
                    Cancel
                </Button> */}
            </Box>
        </Box>
    )
}

export default FormBuild;
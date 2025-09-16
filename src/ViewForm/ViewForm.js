import { useParams } from "react-router-dom";
import config from "../config";
import { useEffect, useRef, useState } from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import axios from "axios";
import { Formio } from "formiojs";


const ViewForm = () => {
    const { id } = useParams(); // form id from route param
    const [formSchema, setFormSchema] = useState(null);
    const rendererRef = useRef(null);


    const fetchForm = async () => {
        try {
            const res = await axios.get(`${config.apiUrl}/form/${id}`);
            setFormSchema({
                name: res.data.name, country: res.data.country,
                brand: res.data.brand, schema: res.data.form_schema
            }); // { name, country, brand, components }
        } catch (err) {
            console.log("Failed to load form");
        }
    };

    useEffect(() => {
        fetchForm();
    }, []);

    useEffect(() => {
        if (rendererRef.current) {
            Formio.createForm(rendererRef.current, formSchema.schema).then((form) => {
                form.on("submit", (submission) => {
                    console.log("Form submission:", submission.data);
                });
            });
        }
    }, [formSchema]);

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
                {formSchema?.country} - {formSchema?.brand}
            </Typography>

            {/* Render Form.io form */}
            {formSchema?.schema ? (
                <Card sx={{ boxShadow: 3, borderRadius: 2, maxWidth: '50vw', marginTop: 5 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {formSchema?.name}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box ref={rendererRef} />
                    </CardContent>
                </Card>
            ) : <></>}
        </Box>);
}

export default ViewForm;
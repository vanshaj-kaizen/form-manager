import { useParams } from "react-router-dom";
import config from "../config";
import { useEffect, useRef, useState } from "react";
import { Box, Typography, Card, CardContent, Divider, Button } from "@mui/material";
import axios from "axios";
import { Formio } from "formiojs";
import style from './style.module.css'


const ViewForm = () => {
    const { id } = useParams(); // form id from route param
    const [formSchema, setFormSchema] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [showSubmission, setShowSubmission] = useState(false)
    const [columns, setColumns] = useState([])
    const rendererRef = useRef(null);


    const fetchForm = async () => {
        try {
            const res = await axios.get(`${config.apiUrl}/form/${id}`);
            setFormSchema({
                name: res.data.name, country: res.data.country,
                brand: res.data.brand, schema: res.data.form_schema
            });
        } catch (err) {
            console.log("Failed to load form");
        }
    };

    const submitForm = async ({ payload }) => {
        try {
            const res = await axios.post(config.apiUrl + '/submission', payload);

        }
        catch (e) {
            console.log(e);
        }
    }

    const fetchSubmissions = async () => {
        try {
            const response = await axios(config.apiUrl + `/submission/all/${id}`);
            console.log(response)
            setSubmissions(response?.data);
            if (response?.data) {
                setColumns(Object.keys(response?.data[0]))
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    const handleViewSubmission = () => {
        setShowSubmission(true)
        fetchSubmissions();
    }

    const handleHideSubmission = () => {
        setShowSubmission(false);
    }

    useEffect(() => {
        fetchForm();
    }, []);

    useEffect(() => {
        if (rendererRef.current) {
            Formio.createForm(rendererRef.current, formSchema.schema).then((form) => {
                form.on("submit", async (submission) => {
                    console.log("Form submission:", submission.data);
                    await submitForm({ payload: { formId: id, data: submission.data } });
                    form.emit("submitDone", submission); // 👈 tell Form.io submission is finished

                });
            });
        }
    }, [formSchema]);

    return (
        <Box className={style.container}>
            <Box className={style.formContainer}>
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* <Typography variant="h5" gutterBottom>
                {formSchema?.country} - {formSchema?.brand}
            </Typography> */}
                    <div style={{ display: 'flex', gap: 40 }}>
                        <div className={style.detailCard}>{formSchema?.country}</div>
                        <div className={style.detailCard}>{formSchema?.brand}</div>
                    </div>
                    {/* Render Form.io form */}
                    {formSchema?.schema ? (
                        <Card sx={{ boxShadow: 3, borderRadius: 2, maxWidth: '50vw', marginTop: 5, marginBottom: 5 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {formSchema?.name}
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box ref={rendererRef} />
                            </CardContent>
                        </Card>
                    ) : <></>}
                    {showSubmission ? <Button variant="contained" onClick={handleHideSubmission}>Hide Submissions</Button>
                        : <Button variant="contained" onClick={handleViewSubmission}>View All Submissions</Button>}

                </Box>
            </Box >
            {showSubmission ? <div>
                <h2 style={{
                    marginTop: 50,
                }}>
                    {formSchema.name}'s Submissions
                </h2>
                <div className={style.tableWrapper}>
                    <table style={{ width: '100%' }}>
                        <thead style={{ backgroundColor: '#1976d2', color: '#ffffff' }} >
                            <tr >
                                {columns.map(c => <th key={c}>
                                    <div className={style.tableHead}>{c.toUpperCase()}</div>
                                </th>)}
                            </tr>
                        </thead>

                        <tbody style={{ backgroundColor: 'white', padding: 5 }}>
                            {submissions.map((s, i) => (
                                <tr key={i} >
                                    {columns.map(c => <td key={c}>
                                        <div className={style.tableData} style={{}}>{s[c] || '-'}</div>
                                    </td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> </div> : <></>
            }
        </Box>);
}

export default ViewForm;
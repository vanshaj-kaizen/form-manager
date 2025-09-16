import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import config from '../config'
import style from './style.module.css'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [forms, setForms] = useState();
    const navigate = useNavigate();

    async function fetchAllForm() {
        try {
            const res = await axios(config.apiUrl + '/form/all');
            console.log(res);
            const data = res.data;
            data.sort((a,b) => b.id - a.id);
            console.log('data',data)
            setForms(data);
        }
        catch (e) {
            console.log(e)
        }
    }

    async function DeleteForm({ id }) {
        try {
            await axios.delete(config.apiUrl + `/form/${id}`);
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleView = (form) => {
        console.log("View form:", form);
        navigate(`/forms/${form.id}`)
    };

    const handleEdit = (form) => {
        console.log("Edit form:", form);
        navigate(`/forms/edit/${form.id}`)
    };

    const handleDelete = async (id) => {
        console.log("Delete form id:", id);
        await DeleteForm({id});
        await fetchAllForm();

    };

    useEffect(() => {
        fetchAllForm()
    }, [])
    return (<div className={style.tableContainer}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                        <TableCell>S. No</TableCell>
                        <TableCell>Form Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {forms?.map((form, index) => (
                        <TableRow key={form.id}>
                            <TableCell>{index +1}</TableCell>
                            <TableCell>{form.name}</TableCell>
                            <TableCell>{form.country}</TableCell>
                            <TableCell>{form.brand}</TableCell>
                            <TableCell align="center">
                                <IconButton color="primary" onClick={() => handleView(form)}>
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => handleEdit(form)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDelete(form.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>)
}

export default Home;
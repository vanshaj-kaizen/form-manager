import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,

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
    const [dialogueOpen, setDialogueOpen] = useState(false);
    const [selectedFormId, setSelectedFormId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedFormId(id);
        setDialogueOpen(true);
    };

    function handleDialogueClose() {
        setDialogueOpen(false);
        setSelectedFormId(null);
    };

    function handleDialogueConfirm() {
        setDialogueOpen(false);
        console.log('delete', selectedFormId) // call your submission function
        handleDelete();
    };

    async function fetchAllForm() {
        try {
            const res = await axios(config.apiUrl + '/form/all');
            const data = res.data;
            data.sort((a, b) => b.id - a.id);
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
        navigate(`/forms/${form.id}`)
    };

    const handleEdit = (form) => {
        console.log("Edit form:", form);
        navigate(`/forms/edit/${form.id}`)
    };

    const handleDelete = async () => {
        console.log("Delete form id:", selectedFormId);
        await DeleteForm({ id: selectedFormId });
        await fetchAllForm();

    };

    useEffect(() => {
        fetchAllForm()
    }, [])
    return (<div className={style.tableContainer}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
                    <TableRow>
                        <TableCell>S. No</TableCell>
                        <TableCell>Form Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "#f9f9f9" }}>
                    {forms?.map((form, index) => (
                        <TableRow key={form.id} sx={{
                            "&:hover": {
                                backgroundColor: "#f5f5f5", // light gray
                            },
                        }}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{form.name}</TableCell>
                            <TableCell>{form.country}</TableCell>
                            <TableCell>{form.brand}</TableCell>
                            <TableCell align="center">
                                <IconButton color="primary" onClick={() => handleView(form)}>
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton color="success" onClick={() => handleEdit(form)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => { handleDeleteClick(form.id) }}
                                >
                                    <DeleteIcon />
                                </IconButton>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
        <Dialog open={dialogueOpen} onClose={handleDialogueClose}>
            <DialogTitle>
                Confin Delete
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this form?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogueClose} color="black">
                    Cancel
                </Button>
                <Button onClick={() => { handleDialogueConfirm() }} color="primary" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </div>)
}

export default Home;
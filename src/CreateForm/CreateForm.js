import { DisplaySettings } from "@mui/icons-material";
import { useState } from "react";
import FormMetaInput from "../FormMetaInput/FormMetaInput";
import FormBuild from "../FormBuilder/FormBuilder";
import config from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
       <FormBuild />
    )
}

export default CreateForm;
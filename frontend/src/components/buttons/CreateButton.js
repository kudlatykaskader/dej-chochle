import React from "react";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";

const CreateButton = () => {
    const navigate = useNavigate();

    return <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/create")}
    >
        <AddCircle />
    </Button>
}

export default CreateButton;
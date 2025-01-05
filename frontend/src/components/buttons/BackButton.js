import React from "react";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";


const BackButton = () => {
    const navigate = useNavigate();

    return <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
    >
        <Home />
    </Button>
}

export default BackButton;
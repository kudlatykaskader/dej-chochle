import React from "react";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material";

const ShowButton = ({id}) => {
    const navigate = useNavigate();

    return <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate(`/posts/${id}`)}
    >
        <Visibility />
    </Button>
}

export default ShowButton;
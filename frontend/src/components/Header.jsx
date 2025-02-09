import { Container } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import KontaktModal from './KontaktModal';

import {
    StyledButton,
} from './styled-components';


const Header = () => {
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState({ kontakt: false, jakGrac: false, pomocy: false });
        
    const handleOpen = (modal) => setOpenModal((prev) => ({ ...prev, [modal]: true }));
    const handleClose = (modal) => setOpenModal((prev) => ({ ...prev, [modal]: false }));

    return (
        <Container maxWidth="sm" sx={{ alignContent: "center", display: "flex", justifyContent: "center", mt: 2 }}>
            <StyledButton onClick={() => handleOpen("kontakt")}>Kontakt</StyledButton>
            <StyledButton onClick={() => navigate("/pomocy")}>Pomocy!</StyledButton>

            <KontaktModal open={openModal.kontakt} handleClose={() => handleClose("kontakt")} />
        </Container>
    );
};

export default Header;
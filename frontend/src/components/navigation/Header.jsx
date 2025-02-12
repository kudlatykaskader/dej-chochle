import React, { useState } from 'react';
import { Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KontaktModal from '../navigation-pages/KontaktModal';
import { StyledButton, StyledAppBar } from '../styled-components';

const Header = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState({ kontakt: false, jakGrac: false, pomocy: false });

    const handleOpen = (modal) =>
        setOpenModal((prev) => ({ ...prev, [modal]: true }));
    const handleClose = (modal) =>
        setOpenModal((prev) => ({ ...prev, [modal]: false }));

    return (
        <>
            <StyledAppBar>
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <StyledButton onClick={() => handleOpen('kontakt')}>
                        Kontakt
                    </StyledButton>
                    <StyledButton onClick={() => navigate('/pomocy')}>
                        Pomocy!
                    </StyledButton>
                </Toolbar>
            </StyledAppBar>
            <Toolbar/>
            <KontaktModal
                open={openModal.kontakt}
                handleClose={() => handleClose('kontakt')}
            />
        </>
    );
};

export default Header;

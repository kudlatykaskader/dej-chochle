import React, { useState } from 'react';
import { Typography, Divider, Button} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import NotesIcon from '@mui/icons-material/Notes';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import InfoCard from './InfoCard';


import {
    OuterSectionContainer,
    OuterSectionIcon,
    InfoStepsCardsContainer,
    HorizontalButtonGroup,
} from './styled-components';

const steps = [
    { icon: AddAPhotoIcon, label: 'Zrób zdjęcia', description: 'Pochwal się gdzie jest Podróżnik' },
    { icon: NotesIcon, label: 'Napisz historię', description: 'Napisz coś o sobie i o swojej przygodzie z Podróżnikiem.' },
    { icon: AddCircleIcon, label: 'Dodaj przystanek', description: 'Użyj formularza na końcu strony, aby dodać przystanek.' },
    { icon: PersonAddAlt1Icon, label: 'Podaj dalej', description: 'Przekaż Podróżnika wybranej przez siebie osobie.' },
];

const Introduction = ({ onScrollToMultiPost, onScrollToCreatePost }) => {
    return (
        <OuterSectionContainer>
            <OuterSectionIcon>
                <InfoIcon />
            </OuterSectionIcon>

            <Typography variant="h1" color="primary" gutterBottom>
                Hej!
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h4" gutterBottom>
                Dobrze trafiłeś!
            </Typography>

            <Typography variant="body1" gutterBottom>
                Znalazłeś, lub ktoś podarował Ci Podróżnika? Właśnie stałeś nowym Posiadaczem!
                <br />Weź udział w tej niezwykłej zabawie i poznaj historie Podróżnika
            </Typography>

            {/* <Typography variant="body1" gutterBottom>
                    Przed Tobą niezwykła przygoda, której staniesz się częścią.
                </Typography> */}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h5" gutterBottom>
                Na czym to polega?
            </Typography>

            <Typography variant="body1" gutterBottom className='info-section-paragraph'>
                Podróżnik to figurka, którą <b>przekazujesz dalej wybranej przez siebie osobie.</b> Wybierz mądrze, kto stanie się nowym Posiadaczem!
            </Typography>
            <Typography variant="body1" gutterBottom className='info-section-paragraph'>
                Zanim to zrobisz, <b>zrób zdjęcia, napisz historię i dodaj przystanek na mapie</b> za pomocą formularza na dole strony.
            </Typography>
            <Typography variant="body1" gutterBottom>
                <b>Szczęśliwy Podróżnik to taki, który nie stoi w miejscu!</b>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <InfoStepsCardsContainer>
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <InfoCard key={index} title={step.label} description={step.description} icon={Icon} />
                    )
                })}
            </InfoStepsCardsContainer>

            {/* Buttons */}
            <HorizontalButtonGroup>
                <Button variant="contained" color="primary" onClick={onScrollToMultiPost}>
                    Przejdź do galerii
                </Button>
                <Button variant="contained" color="secondary" onClick={onScrollToCreatePost}>
                    Dodaj przystanek
                </Button>
            </HorizontalButtonGroup>

        </OuterSectionContainer>
    );
};

export default Introduction;

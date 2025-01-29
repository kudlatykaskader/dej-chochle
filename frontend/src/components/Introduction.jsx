import React from 'react';
import { Typography, Divider, Button } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import NotesIcon from '@mui/icons-material/Notes';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { 
    OuterSectionContainer,
    OuterSectionIcon,
    InfoStepsCardsContainer,
    InfoStepsCard,
    InfoStepsCardIconBox,
    HorizontalButtonGroup,
    InfoStepsCardContent
} from './styled-components';

const steps = [
    { icon: AddAPhotoIcon, label: 'Zrób zdjęcia', description: 'Tylko Ty i Podróżnik w zwyczajnie zwykłym lub kosmicznie niezwykłym miejscu' },
    { icon: NotesIcon, label: 'Napisz historię', description: 'Kilka zdań: O miejscu, w którym jesteś, o Podróżniku, o sobie. A może wiadomość dla świata?' },
    { icon: AddCircleIcon, label: 'Dodaj przystanek', description: 'Podziel się swoją historią z innymi, dodając przystanek na mapie.' },
    { icon: PersonAddAlt1Icon, label: 'Podaj dalej', description: 'Mianuj kolejnego Posiadającego i przekaż mu Podróżnika. Pamiętaj, że jest on gościem w Twoim życiu tylko kilka dni.' },
];

const Introduction = ({ onScrollToMultiPost, onScrollToCreatePost }) => {
    return (
        <OuterSectionContainer>
                <OuterSectionIcon>
                    <InfoIcon/>
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
                </Typography>
                
                <Typography variant="body1" gutterBottom>
                    Przed Tobą niezwykła przygoda, której staniesz się częścią.
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body1" gutterBottom>
                    Jeżeli zaglądasz tu z ciekawości, to pamiętaj, że tylko Posiadacze mogą dodawać przystanki.
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" gutterBottom>
                    Wystarczy, że wykonasz te proste kroki:
                </Typography>

                <InfoStepsCardsContainer>
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <InfoStepsCard key={index}>
                                <InfoStepsCardIconBox>
                                    <Icon/>
                                </InfoStepsCardIconBox>
                                <InfoStepsCardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {step.label}
                                    </Typography>
                                    <Typography variant="body2">
                                        {step.description}
                                    </Typography>
                                </InfoStepsCardContent>
                            </InfoStepsCard>
                        );
                    })}

                {/* Buttons */}
                <HorizontalButtonGroup>
                    <Button variant="contained" color="primary" onClick={onScrollToMultiPost}>
                        Przejdź do galerii
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onScrollToCreatePost}>
                        Dodaj przystanek
                    </Button>
                </HorizontalButtonGroup>
                </InfoStepsCardsContainer>
        </OuterSectionContainer>
    );
};

export default Introduction;

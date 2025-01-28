import React from 'react';
import { Typography, Box, Divider, Button, Card, CardContent } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import NotesIcon from '@mui/icons-material/Notes';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const steps = [
    { icon: AddAPhotoIcon, label: 'Zrób zdjęcia', description: 'Z Tobą, Podróżnikiem w zwykłym lub kompletnie niezwykłym miejscu.' },
    { icon: NotesIcon, label: 'Napisz historię', description: 'O miejscu, w którym jesteś, o Podróżniku, o sobie.' },
    { icon: AddCircleIcon, label: 'Dodaj przystanek', description: 'Podziel się swoją historią z innymi, dodając przystanek na mapie.' },
    { icon: PersonAddAlt1Icon, label: 'Podaj dalej', description: 'Podaruj Podróżnika kolejnej osobie, aby kontynuował swoją podróż.' },
];

const Introduction = ({ onScrollToMultiPost, onScrollToCreatePost }) => {
    return (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                <InfoIcon color="primary" style={{ fontSize: 60 }} />
            </Box>

            <Typography variant="h1" color="primary" gutterBottom>
                Hej!
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h4" gutterBottom>
                Dobrze trafiłeś!
            </Typography>

            <Typography variant="body1" gutterBottom>
                Jeżeli ktoś podarował Ci Podróżnika, oznacza to że stałeś nowym Posiadaczem.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Przed Tobą niezwykła przygoda, której staniesz się częścią.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" gutterBottom>
                Wystarczy, że wykonasz te proste kroki:
            </Typography>

            {/* Timeline */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <Card key={index} sx={{ display: 'flex', alignItems: 'center', pt: 0, pb: 0, pl: 2, pr: 2, boxShadow: 3 }}>
                            <Box sx={{ mr: 2 }}>
                                <Icon color="primary" style={{ fontSize: 40 }} />
                            </Box>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {step.label}
                                </Typography>
                                <Typography variant="body2">
                                    {step.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })}
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button variant="contained" color="primary" onClick={onScrollToMultiPost}>
                    Przejdź do galerii
                </Button>
                <Button variant="contained" color="secondary" onClick={onScrollToCreatePost}>
                    Dodaj przystanek
                </Button>
            </Box>

            <Divider sx={{ my: 2 }} />
        </Box>
    );
};

export default Introduction;

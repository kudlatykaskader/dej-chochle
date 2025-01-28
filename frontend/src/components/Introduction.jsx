import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Divider, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/system';
import CreateButton from "./buttons/CreateButton";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import QrCode2Icon from '@mui/icons-material/QrCode2';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import NotesIcon from '@mui/icons-material/Notes';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const steps = [
    // { icon: '2', text: 'Przeczytaj historię Podróżnika.' },
    { icon: AddAPhotoIcon, label: 'Zrób i dodaj zdjęcia', description: 'Z Tobą i Podróżnikiem w zwykłym lub kompletnie niezwykłym miejscu.' },
    { icon: NotesIcon, label: 'Napisz historię', description: 'O miejscu, w którym jesteś, o Podróżniku, o sobie.' },
    { icon: AddCircleIcon, label: 'Podaj dalej', description: 'Podaruj Podróżnika kolejnej osobie, aby kontynuował swoją podróż.' },
];

const Introduction = ({ onScrollToMultiPost, onScrollToCreatePost }) => {
    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
            <Box>
                <Typography variant="h1" color="primary" gutterBottom >
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

                <Stepper activeStep={steps[0]} orientation="vertical">
                    {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>
                            <Typography variant="h6">
                                {step.label}
                            </Typography>
                            <Typography variant="body2">
                                {step.description}
                            </Typography>
                        </StepLabel>
                        <StepContent>
                        </StepContent>
                    </Step>
                    ))}
                </Stepper>
                
                <Divider sx={{ my: 2 }} />

                {/* Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={onScrollToMultiPost}>
                        Przejdź do galerii
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onScrollToCreatePost}>
                        Dodaj przystanek
                    </Button>
                </Box>

                {/* <Typography variant="h6" gutterBottom>
                    Pamiętaj, że Podróżnik jest tylko gościem w Twoim życiu. Nie zatrzymuj go na dłużej niż na kilka dni. Po tym czasie przekaż go dalej, aby kontynuował swoją podróż. Dziękujemy za udział w naszym projekcie i życzymy miłej zabawy!
                </Typography> */}
            </Box>
        </Paper>
    );
};

export default Introduction;

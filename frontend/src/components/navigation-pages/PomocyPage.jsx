import React from "react";
import { Button, Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useNavigate } from "react-router-dom"; // Import for navigation

// Styled page container
const PageContainer = styled(Container)({
    padding: "40px 20px",
    maxWidth: "800px",
});

// Styled modern Accordion
const ModernAccordion = styled(Accordion)({
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    boxShadow: "none",
    border: "1px solid #ddd",
    "&:before": { display: "none" },
    "&:hover": { backgroundColor: "#f4f4f4" },
    "& .MuiAccordionSummary-root": {
        borderRadius: 8,
        transition: "all 0.3s ease",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
        color: "#1976d2",
    },
    "& .MuiAccordionDetails-root": {
        backgroundColor: "#ffffff",
        borderRadius: "0 0 8px 8px",
        padding: "12px",
    },
});

// FAQ Data
const faqItems = [
    { question: "Podróżnik jest zepsuty, co mam zrobić?", answer: "Skontaktuj się z nami (zakładka Kontakt) i opisz problem. Jeżeli nie znajdujesz się na końcu świata, to wyślemy Ci nowego." },
    { question: "Czy mogę zabrać Podróżnika na wakacje?", answer: "Oczywiście! O ile nie będziesz go przetrzymywać zbyt długo. Podróżnik lubi być w ruchu." },
    { question: "Komu mogę przekazać Podróżnika?", answer: "Podróżnika możesz przekazać każdemu, kto zgodzi się na zasady gry. Może to być Twoja rodzina, przyjaciele, a nawet nieznajomi, o ile rozumieją zasady. Nie chcemy aby Podróżnik zaginął lub został stałą ozdobą na półce." },
    { question: "Co powinny przedstawiać zdjęcia?", answer: "Zdjęcie powinno przedstawiać Podróżnika w ciekawym miejscu, który odwiedził razem z Tobą. Może to być zabytek, piękny widok, a nawet Twoje ulubione miejsce w mieście. Pamiętaj, aby nie pokazywać adresu zamieszkania." },
    { question: "Czy mogę zabrać Podróżnika na wycieczkę poza Polskę?", answer: "Oczywiście! Podróżnik uwielbia podróże. Pamiętaj jednak, aby wrócił z Tobą do Polski." },
    { question: "Nie mogę dodać przystanku na mapie, co mam zrobić?", answer: "Jeżeli formularz nie działa, to skontaktuj się z nami (zakładka Kontakt) i opisz problem. Możesz wysłać nam zdjęcia oraz notatkę, a my dodamy je do dziennika." },
    { question: "Czy mogę przekazać Podróżnika dalej, jeżeli nie dodałem przystanku na mapie?", answer: "Oczywiście! Przystanek na mapie to dodatkowa atrakcja, ale nie jest obowiązkowy. Pamiętaj jednak, aby przekazać Podróżnika dalej." }
];

const PomocyPage = () => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        window.scrollTo(0, 0); // Ensures the page scrolls to the top
        navigate("/");
    };
    
    return (
        <PageContainer>
            {/* Header */}
            <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}>
                Pomocy! - FAQ
            </Typography>
            {/* Back Button */}
            <Box sx={{ mt: 4, mb: 4, alignItems: "center", display: "flex", justifyContent: "center" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNavigateHome()} // Navigate to the homepage
                    sx={{ fontWeight: "bold" }}
                >
                    Powrót do strony głównej
                </Button>
            </Box>
            {/* FAQ Section */}
            {faqItems.map((item, index) => (
                <ModernAccordion key={index} sx={{ mb: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: "bold" }}>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                </ModernAccordion>
            ))}
        </PageContainer>
    );
};

export default PomocyPage;

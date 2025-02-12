import { styled } from '@mui/material/styles';
import { Box, Container, Card, CardContent, Button, AppBar } from '@mui/material';

export const AppContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - var(--footer-height))',
    position: 'relative',

});

export const OuterSectionContainer = styled(Container)({
    mt: 2,
    mb: 2,
    textAlign: 'center'
});


export const OuterSectionIcon = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2),
    '& .MuiSvgIcon-root': {
        fontSize: 40,
    },
}));

export const InfoStepsCardsContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    mt: 3
});

export const InfoStepsCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    boxShadow: 3,
    alignContent: 'center',
    '& .MuiSvgIcon-root': {
        fontSize: 30,
        color: theme.palette.primary.main,
    },
}));


export const InfoStepsCardIconBox = styled(Box)(({ theme }) => ({
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
}));

export const InfoStepsCardContent = styled(CardContent)(({ theme }) => ({
    // display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    flex: 1, // Allows the content to take up remaining space if needed
}));

export const HorizontalButtonGroup = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    gap: 40
});

export const ModalBox = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow: 24,
    padding: 20,
});

export const StyledButton = styled(Button)({
    color: "primary",
    fontSize: '1.2rem',
    margin: "0 10px",
});

export const StyledAppBar = styled(AppBar)({
    backgroundColor: 'white',
});

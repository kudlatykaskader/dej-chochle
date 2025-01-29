import { styled } from '@mui/material/styles';
import { Box, Container, Card, CardContent } from '@mui/material';

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
        fontSize: 60,
    },
}));

export const InfoStepsCardsContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
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
        fontSize: 40,
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
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 4
});
import React from 'react';
import { useTheme, useMediaQuery, Typography, Container } from '@mui/material';
import { InfoStepsCard, InfoStepsCardIconBox, InfoStepsCardContent } from './styled-components';
import PropTypes from 'prop-types';
import './InfoCard.css'

const InfoCard = ({ title, description, icon }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const Icon = icon;
    return (
        <InfoStepsCard className="info-card">
            {!isMobile && (
                <InfoStepsCardIconBox>
                    <Icon />
                </InfoStepsCardIconBox>
            )}
            <InfoStepsCardContent>
                {isMobile && (
                    <Container sx={{ display: 'flex', justifyContent: 'center' , flexDirection: 'row', alignItems: 'center'}}>
                        <InfoStepsCardIconBox>
                            <Icon />
                        </InfoStepsCardIconBox>
                        <Typography variant="h6" gutterBottom>
                            {title}
                        </Typography>
                    </Container>
                )}
                {!isMobile && (
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                )}
                <div className='info-card-description'>
                    {description}
                </div>
            </InfoStepsCardContent>
        </InfoStepsCard>
    );
};

InfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.element,
};

export default InfoCard;
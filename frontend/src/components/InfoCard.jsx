import React from 'react';
import { useTheme, useMediaQuery, Typography } from '@mui/material';
import { InfoStepsCard, InfoStepsCardIconBox, InfoStepsCardContent } from './styled-components';
import PropTypes from 'prop-types';

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
                    <InfoStepsCardIconBox>
                        <Icon />
                    </InfoStepsCardIconBox>
                )}
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
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
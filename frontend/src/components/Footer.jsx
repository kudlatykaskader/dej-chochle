import React from 'react';
import { Container, Typography, Link, Box, Grid2 as Grid } from '@mui/material';
import { Email, WhatsApp, Telegram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.dark',
        color: 'white',
        py: 4,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* Contact Section */}
          <Grid item xs={12} md={6} textAlign="center">
            <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
              {/* Email */}
              <Link
                href="mailto:podejdalej@int.pl"
                color="inherit"
                underline="hover"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': { color: 'secondary.main' },
                }}
              >
                <Email fontSize="small" />
                podejdalej@int.pl
              </Link>

              {/* WhatsApp */}
              <Link
                href="https://wa.me/48667034754"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                underline="hover"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': { color: 'secondary.main' },
                }}
              >
                <WhatsApp fontSize="small" />
                WhatsApp
              </Link>

              {/* Telegram */}
              <Link
                href="https://t.me/kudlatykaskader"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                underline="hover"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': { color: 'secondary.main' },
                }}
              >
                <Telegram fontSize="small" />
                Telegram
              </Link>

            </Box>
          </Grid>
        </Grid>

        {/* Created with Love */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            Created with ❤️ by{' '}
            <Link
              href="https://github.com/warehog"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="hover"
              sx={{ fontWeight: 'bold', color: 'secondary.main' }}
            >
              Mateusz Wójcik
            </Link>{' '}
            &{' '}
            <Link
              href="https://github.com/Fuzyn"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="hover"
              sx={{ fontWeight: 'bold', color: 'secondary.main' }}
            >
              Michał Wierzbicki
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
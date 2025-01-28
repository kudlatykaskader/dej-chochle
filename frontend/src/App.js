import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from "axios";
import Footer from './components/Footer';

function App() {
    if (process.env.NODE_ENV === 'development') {
        axios.defaults.baseURL = 'http://localhost:3001/api';
    } else if (process.env.NODE_ENV === 'production') {
        axios.defaults.baseURL = '/api';
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
            <Footer />
        </ThemeProvider>
    );
}

export default App;
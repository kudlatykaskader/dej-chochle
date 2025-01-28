import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import MultiPost from './components/MultiPost';
import SinglePost from './components/SinglePost';
import CreatePost from './components/upload-form/CreatePost';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from "axios";

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
                    <Route path="/" element={<MultiPost />} />
                    <Route path="/posts/:id" element={<SinglePost />} />
                    <Route path="/create" element={<CreatePost />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
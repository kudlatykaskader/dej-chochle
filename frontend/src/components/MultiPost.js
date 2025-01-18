import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import Post from "./Post";
import CreateButton from "./buttons/CreateButton";
import {getPosts} from "./PostApi";

const MultiPost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts((response) => setPosts(response.data))
    }, []);

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h1" color="primary" gutterBottom>
                    Wszystkie Posty
                </Typography>
                <Box sx={{m: 'auto 10px'}}>
                    <CreateButton/>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {posts.map((post) => (
                    <Grid item xs={12} key={post.id}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MultiPost;
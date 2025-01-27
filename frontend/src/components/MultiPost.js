import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import Post from "./Post";
import CreateButton from "./buttons/CreateButton";
import { getPosts } from "./PostApi";


// SpoonJourney.js
import Timeline from './Timeline';
import TimelineItem from './TimelineItem';

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
                <Box sx={{ m: 'auto 10px' }}>
                    <CreateButton />
                </Box>
            </Box>
            <Timeline>
                {posts.map((post, index) => (
                    <TimelineItem key={index}
                        time={ post.created_at }
                        place={ post.location }
                        header={ post.title }
                        paragraph="The spoon is carefully crafted from quality wood."
                        attachments={ post.attachments }
                    />
                ))}
            </Timeline>
        </Container>
    );
};

export default MultiPost;
import React, { useEffect, useState } from 'react';
import { Container, Typography, Divider, Box } from '@mui/material';
import { getPosts } from "./PostApi";

import Timeline from './timeline/Timeline';
import TimelineItem from './timeline/TimelineItem';

import MapIcon from '@mui/icons-material/Map';

const MultiPost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts((response) => setPosts(response.data))
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 4, p: 1 }} style={{ marginBottom: '50px', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
              <MapIcon color="primary" style={{ fontSize: 60 }} />
            </Box>
            
            <Typography variant="h6" gutterBottom>
                Najnowsze przystanki
            </Typography>
            <Timeline>
                {posts.map((post, index) => (
                    <TimelineItem key={index}
                        time={ post.created_at }
                        place={ post.location }
                        header={ post.title }
                        paragraph={ post.content }
                        attachments={ post.attachments }
                    />
                ))}
            </Timeline>
            <Divider sx={{ my: 2 }} />
        </Container>
    );
};

export default MultiPost;
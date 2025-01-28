import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { getPosts } from "./PostApi";

import Timeline from './timeline/Timeline';
import TimelineItem from './timeline/TimelineItem';

const MultiPost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts((response) => setPosts(response.data))
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }} style={{ marginBottom: '50px', textAlign: 'center' }}>
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
        </Container>
    );
};

export default MultiPost;
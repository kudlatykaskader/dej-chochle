import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Post from "./Post";
import {getPost} from "./PostApi";

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        getPost(id, (response) => setPost(response.data))
    }, [id]);

    if (!post) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Post post={post} />
        </Container>
    );
};

export default SinglePost;
import React from "react";
import { Typography, Card, CardContent, CardMedia, Grid, Box } from '@mui/material';
import { useLocation } from "react-router-dom";
import BackButton from "./buttons/BackButton";
import ShowButton from "./buttons/ShowButton";

const Post = ({post}) => {
    const location = useLocation();

    return <Card>
        <CardContent>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" color="primary">
                    {post.title}
                </Typography>
                <Box sx={{m: 'auto 10px'}}>
                    {location.pathname.includes(`/posts/${post.id}`) ?
                        <BackButton/>
                        :
                        <ShowButton id={post.id} />
                    }
                </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
                {post.content}
            </Typography>
            <Grid container spacing={2}>
                {post.attachments &&
                    post.attachments.map((attachment, index) => (
                        <Grid item xs={12} sm={6} key={index} display="flex" justifyContent="center">
                            <Card sx={{width: "max-content"}}>
                                {attachment.type.startsWith('image/') ? (
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            maxHeight: "200px", // Maksymalna wysokość obrazu
                                            width: "auto", // Automatyczne dopasowanie szerokości
                                            margin: "0 auto", // Wycentrowanie w poziomie
                                        }}
                                        image={attachment.url}
                                        alt={`Załącznik ${index + 1}`}
                                    />
                                ) : attachment.type.startsWith('video/') ? (
                                    <CardMedia
                                        component="video"
                                        height="200"
                                        controls
                                        src={attachment.url}
                                        alt={`Załącznik ${index + 1}`}
                                    />
                                ) : (
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {attachment.url}
                                        </Typography>
                                    </CardContent>
                                )}
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </CardContent>
    </Card>
}

export default Post;

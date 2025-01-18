import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BackButton from "./buttons/BackButton";
import { useNavigate } from "react-router-dom";
import {createPost} from "./PostApi";

const CreatePost = () => {
    const [post, setPost] = useState({title: '', content: ''});
    const [attachments, setAttachments] = useState([]);
    let navigate = useNavigate();

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setAttachments([...attachments, ...files]);
    };

    const handleRemoveFile = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(post, attachments, () => {
            setPost({title: '', content: ''});
            setAttachments([]);
            navigate("/")
        })
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h2" color="primary" gutterBottom>
                    Stwórz nowy post
                </Typography>
                <Box sx={{m: 'auto 10px'}}>
                    <BackButton/>
                </Box>
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <TextField
                    fullWidth
                    label="Tytuł"
                    value={post.title}
                    onChange={(e) => setPost({...post, title: e.target.value})}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Treść"
                    value={post.content}
                    onChange={(e) => setPost({...post, content: e.target.value})}
                    multiline
                    rows={4}
                    margin="normal"
                />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {attachments.map((file, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card>
                                {file.type.startsWith('image/') ? (
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={URL.createObjectURL(file)}
                                        alt={file.name}
                                    />
                                ) : file.type.startsWith('video/') ? (
                                    <CardMedia
                                        component="video"
                                        height="140"
                                        controls
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                    />
                                ) : (
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {file.name}
                                        </Typography>
                                    </CardContent>
                                )}
                                <CardContent>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleRemoveFile(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Dodaj załączniki
                    <input
                        type="file"
                        multiple
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 4 }}
                >
                    Wyślij
                </Button>
            </Box>
        </Container>
    );
};

export default CreatePost;
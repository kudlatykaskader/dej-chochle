import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BackButton from "./buttons/BackButton";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useNavigate } from "react-router-dom";
import { createPost } from "./PostApi";

const CreatePost = () => {
    const [post, setPost] = useState({ location: '', title: '', content: '' });
    const [attachments, setAttachments] = useState([]);
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setAttachments([...attachments, ...files]);
    };

    const handleCameraCapture = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setAttachments([...attachments, file]);
        }
    };

    const handleRemoveFile = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(post, attachments, () => {
            setPost({ location: '', title: '', content: '' });
            setAttachments([]);
            navigate("/");
        });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h2" color="primary" gutterBottom>
                    Stwórz nowy post
                </Typography>
                <Box sx={{ m: 'auto 10px' }}>
                    <BackButton />
                </Box>
            </Box>
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <TextField
                    fullWidth
                    label="Lokalizacja"
                    value={post.location}
                    onChange={(e) => setPost({ ...post, location: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Tytuł"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Treść"
                    value={post.content}
                    onChange={(e) => setPost({ ...post, content: e.target.value })}
                    multiline
                    rows={4}
                    margin="normal"
                />

                {/* Media Attachments Section */}
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

                {/* Media Selection Buttons */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            component="label"
                            startIcon={<AttachFileIcon />}
                        >
                            Dodaj pliki
                            <input
                                type="file"
                                multiple
                                hidden
                                onChange={handleFileUpload}
                                accept="image/*,video/*"
                            />
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            component="label"
                            startIcon={<CameraAltIcon />}
                        >
                            Zrób zdjęcie
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                capture="environment"
                                onChange={handleCameraCapture}
                            />
                        </Button>
                    </Grid>
                </Grid>

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
import React, { useState } from 'react';
import {Container, Typography, TextField, Button, Box, Card, CardMedia, CardContent, IconButton, Alert, FormControlLabel, Checkbox} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BackButton from "./buttons/BackButton";
import { useNavigate } from "react-router-dom";
import {createPost} from "./PostApi";

const defaultPost = {
    title: '',
    content: '',
    phone_number: '',
    phone_notifications: false,
    email: '',
    email_notifications: false
}

const CreatePost = () => {
    const [post, setPost] = useState(defaultPost);
    const [attachments, setAttachments] = useState([]);
    const [errors, setErrors] = useState([])

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
            setPost(defaultPost);
            setAttachments([]);
            navigate("/")
        }, (res) => {
            if (res.response.data.errors) {
                setErrors(res.response.data.errors)
            }
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
                {errors.map((error) => {
                    return <Alert severity="warning" sx={{ mt: 1, boxShadow: '1px 1px 1px gray' }}>{error}</Alert>
                })}
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
                <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                    <TextField
                        label="Numer telefonu"
                        value={post.phone_number}
                        onChange={(e) => setPost({...post, phone_number: e.target.value})}
                        disabled={!post.phone_notifications}
                        sx={{ flexGrow: 1, marginRight: 1 }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={post.phone_notifications}
                                onChange={(e) => setPost({...post, phone_notifications: e.target.checked})}
                                color="primary"
                            />
                        }
                        label="Powiadom mnie o przyszłych postach"
                    />
                </Box>
                <Box display="flex" alignItems="center" sx={{ mt: 3 }}>
                    <TextField
                        label="Email"
                        value={post.email}
                        onChange={(e) => setPost({...post, email: e.target.value})}
                        disabled={!post.email_notifications}
                        sx={{ flexGrow: 1, marginRight: 1 }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={post.email_notifications}
                                onChange={(e) => setPost({...post, email_notifications: e.target.checked})}
                                color="primary"
                            />
                        }
                        label="Powiadom mnie o przyszłych postach"
                    />
                </Box>
                <Box>
                    {attachments.map((file, index) => (
                        <Box xs={12} sm={6} key={index} sx={{ mt: 2 }}>
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
                        </Box>
                    ))}
                </Box>
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
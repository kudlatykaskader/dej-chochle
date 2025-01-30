import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
} from "@mui/material";
import { getPosts, deletePost, updatePost } from "../../apis/PostApi";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import EditPostDialog from "./EditPostDialog";

const AdminPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletePostId, setDeletePostId] = useState(null);
    const [editPost, setEditPost] = useState(null); // Stores post object for editing

    // Fetch posts from API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                getPosts((response) => setPosts(response.data));
            } catch (error) {
                setError("Failed to load posts");
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Handle delete confirmation
    const handleConfirmDelete = async () => {
        if (!deletePostId) return;
        try {
            await deletePost(deletePostId);
            getPosts((response) => setPosts(response.data));
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post.");
        } finally {
            setDeletePostId(null);
        }
    };

    // Handle saving edited post
    const handleSaveEdit = async (id, newContent) => {
        try {
            await updatePost(id, { content: newContent });
            getPosts((response) => setPosts(response.data));
            setEditPost(null);
        } catch (error) {
            console.error("Error updating post:", error);
            alert("Failed to update post.");
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Admin Panel
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>ID</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Location</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Content</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Actions</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.location}</TableCell>
                                    <TableCell>{post.content}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setEditPost(post)}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => setDeletePostId(post.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={Boolean(deletePostId)}
                onClose={() => setDeletePostId(null)}
                onConfirm={handleConfirmDelete}
            />

            {/* Edit Post Dialog */}
            {editPost && (
                <EditPostDialog
                    open={Boolean(editPost)}
                    post={editPost}
                    onClose={() => setEditPost(null)}
                    onSave={handleSaveEdit}
                />
            )}
        </Container>
    );
};

export default AdminPage;

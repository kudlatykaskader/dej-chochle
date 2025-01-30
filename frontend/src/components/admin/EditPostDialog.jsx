import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAttachment } from "../../apis/PostApi";

const EditPostDialog = ({ open, post, onClose, onSave }) => {
  const [content, setContent] = useState(post?.content || "");
  const [attachments, setAttachments] = useState(post?.attachments || []);

  // Handle attachment deletion
  const handleDeleteAttachment = async (postId, attachmentId) => {
    try {
      deleteAttachment(postId, attachmentId);
      setAttachments((prev) => prev.filter((att) => att.url !== attachmentId));
    } catch (error) {
      console.error("Error deleting attachment:", error);
      alert("Failed to delete attachment.");
    }
  };

  const handleSave = () => {
    onSave(post.id, content);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edytuj Opis</DialogTitle>
      <DialogContent>
        {/* Post Content */}
        <TextField
          fullWidth
          label="Post Content"
          multiline
          minRows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mt: 2 }}
        />

        {/* Attachments Section */}
        {attachments.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">Załączniki</Typography>
            {attachments.map((attachment) => (
              <Box
                key={attachment.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  border: "1px solid #ddd",
                  padding: 1,
                  borderRadius: "8px",
                }}
              >
                <img src={attachment.medium_url} alt={attachment.filename} style={{ width: "80%", marginRight: "16px" }} />
                <IconButton color="error" onClick={() => handleDeleteAttachment(post.id, attachment.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="success" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostDialog;

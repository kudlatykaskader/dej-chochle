import axios from 'axios';

export const getPost = (id, callback) => {
    axios.get(`/posts/${id}`).then(callback);
}

export const getPosts = (callback) => {
    axios.get(`/posts`).then(callback);
}

export const createPost = async (post, attachments, callback) => {
    const formData = new FormData();
    formData.append('post[location]', post.location);
    formData.append('post[content]', post.content);
    formData.append('post[lat]', post.lat);
    formData.append('post[lng]', post.lng);
    formData.append('post[contact]', post.contact);
    attachments.forEach((file) => formData.append('post[attachments][]', file));

    try {
        const response = await axios.post(`/posts`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        callback(response);
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

export const deletePost = (id, callback) => {
    axios.delete(`/posts/${id}`).then(callback);
}

export const updatePost = async (id, post, attachments, callback) => {
    const formData = new FormData();
    formData.append('post[location]', post.location);
    formData.append('post[content]', post.content);
    formData.append('post[lat]', post.lat);
    formData.append('post[lng]', post.lng);
    formData.append('post[contact]', post.contact);
    attachments.forEach((file) => formData.append('post[attachments][]', file));

    try {
        const response = await axios.put(`/posts/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        callback(response);
    } catch (error) {
        console.error('Error updating post:', error);
    }
}

export const deleteAttachment = (postId, attachmentId, callback) => {
    axios.delete(`/posts/${postId}/attachments/${attachmentId}`).then(callback);
}
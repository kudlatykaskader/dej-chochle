import axios from 'axios';

export const getPost = (id, callback) => {
    axios.get(`/posts/${id}`).then(callback);
}

export const getPosts = (callback) => {
    axios.get(`/posts`).then(callback);
}

export const createPost = (post, attachments, callback) => {
    const formData = new FormData();
    formData.append('post[location]', post.location);
    formData.append('post[content]', post.content);
    formData.append('post[lat]', post.lat);
    formData.append('post[lng]', post.lng);
    formData.append('post[contact]', post.contact);
    attachments.forEach((file) => formData.append('post[attachments][]', file));

    axios.post(`/posts`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(callback);
}

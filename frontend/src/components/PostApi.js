import axios from 'axios';

export const getPost = (id, callback) => {
    axios.get(`/posts/${id}`).then(callback);
}

export const getPosts = (callback) => {
    axios.get(`/posts`).then(callback);
}

export const createPost = (post, attachments, callback, errorCallback) => {
    const formData = new FormData();
    formData.append('post[title]', post.title);
    formData.append('post[content]', post.content);
    formData.append('post[phone_number]', post.phone_number);
    formData.append('post[phone_notifications]', post.phone_notifications);
    formData.append('post[email]', post.email);
    formData.append('post[email_notifications]', post.email_notifications);
    attachments.forEach((file) => formData.append('post[attachments][]', file));

    axios.post(`/posts`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(callback).catch(errorCallback);
}

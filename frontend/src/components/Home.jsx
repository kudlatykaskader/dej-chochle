import React, { useRef } from 'react';
import { Container } from '@mui/material';
import Introduction from './Introduction';
import MultiPost from './MultiPost';
import CreatePost from './upload-form/CreatePost';
import Map from './Map';

const Home = () => {
    const multiPostRef = useRef(null);
    const createPostRef = useRef(null);

    const scrollToComponent = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Introduction
                onScrollToMultiPost={() => scrollToComponent(multiPostRef)}
                onScrollToCreatePost={() => scrollToComponent(createPostRef)}
            />
            <div ref={multiPostRef}>
                <MultiPost />
            </div>
            <div ref={createPostRef}>
                <CreatePost />
            </div>
            {/* <Map locations={[{ lat: 50.049683, lng: 19.944544, description: 'London' }, { lat: 48.8566, lng: 2.3522, description: 'Paris' }]} /> */}
        </Container>
    );
};

export default Home;

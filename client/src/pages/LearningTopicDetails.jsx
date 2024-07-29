import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../http';
import { Box, Typography, Container } from '@mui/material';

function LearningTopicDetails() {
    const { id } = useParams();
    const [topic, setTopic] = useState(null);

    useEffect(() => {
        http.get(`/learning/${id}`).then((res) => {
            setTopic(res.data);
        });
    }, [id]);

    if (!topic) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" sx={{ textAlign: 'center', my: 4 }}>
                {topic.title}
            </Typography>
            <Box>
                <div dangerouslySetInnerHTML={{ __html: topic.content }} />
            </Box>
            {topic.videoFile && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2">Uploaded Video</Typography>
                    <Box sx={{ mt: 2 }}>
                        <video controls style={{ width: '100%', height: 'auto' }}>
                            <source src={`${import.meta.env.VITE_FILE_BASE_URL}${topic.videoFile}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                </Box>
            )}
        </Container>
    );
}

export default LearningTopicDetails;


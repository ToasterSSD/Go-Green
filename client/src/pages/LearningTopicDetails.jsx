import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../http';
import { Box, Typography, Container, Divider } from '@mui/material';

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
            <Box sx={{ display: 'flex', alignItems: 'center', my: 4 }}>
                <Divider sx={{ flexGrow: 1, borderBottomWidth: 3 }} />
                <Typography variant="h6" sx={{ mx: 2 }}>
                    Video
                </Typography>
                <Divider sx={{ flexGrow: 1, borderBottomWidth: 3 }} />
            </Box>
            {topic.videos && topic.videos.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    {topic.videos.map((video, index) => (
                        <Box key={index} sx={{ mt: 2 }}>
                            {video.startsWith('http') ? (
                                <iframe width="100%" height="315" src={video} frameBorder="0" allowFullScreen></iframe>
                            ) : (
                                <video controls style={{ width: '100%', height: 'auto' }}>
                                    <source src={`${import.meta.env.VITE_FILE_BASE_URL}${video}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </Box>
                    ))}
                </Box>
            )}
        </Container>
    );
}

export default LearningTopicDetails;



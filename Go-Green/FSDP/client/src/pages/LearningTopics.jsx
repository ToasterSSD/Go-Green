import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import http from '../http';

function LearningTopics() {
    const [topics, setTopics] = useState([]);
    const [cardHeight, setCardHeight] = useState('auto');
    const cardsRef = useRef([]);

    useEffect(() => {
        http.get('/learning').then((res) => {
            setTopics(res.data);
        });
    }, []);

    useEffect(() => {
        if (topics.length > 0) {
            // Calculate the maximum height of all cards
            const maxHeight = Math.max(...cardsRef.current.map(card => card.clientHeight));
            setCardHeight(maxHeight);
        }
    }, [topics]);

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>Learning Topics</Typography>
            <Link to="/add-learning-topic">
                <Button variant="contained">Add Learning Topic</Button>
            </Link>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {topics.map((topic, index) => (
                    <Grid item xs={12} md={6} lg={4} key={topic.id}>
                        <Card
                            ref={el => cardsRef.current[index] = el}
                            sx={{ 
                                backgroundColor: '#E0FFFF', 
                                height: cardHeight, 
                                display: 'flex', 
                                flexDirection: 'column' 
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">{topic.title}</Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Link to={`/learning/${topic.id}`}>
                                        <Button variant="contained" sx={{ mr: 1 }}>View Details</Button>
                                    </Link>
                                    <Link to={`/edit-learning-topic/${topic.id}`}>
                                        <Button variant="contained" color="primary">Edit</Button>
                                    </Link>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default LearningTopics;

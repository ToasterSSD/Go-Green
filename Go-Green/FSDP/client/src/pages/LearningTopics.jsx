import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import http from '../http';
import HeaderWithBackground from "../components/HeaderWithBackground";

function LearningTopics() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        http.get('/learning').then((res) => {
            setTopics(res.data);
        });
    }, []);

    return (
        <Box>
         <HeaderWithBackground
        title="Learning Admin"
        backgroundImage="/uploads/test.jpg" // Path to your background image
      />
            <Typography variant="h5" sx={{ my: 2 }}>Learning Topics</Typography>
            <Link to="/add-learning-topic">
                <Button variant="contained">Add Learning Topic</Button>
            </Link>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {topics.map((topic) => (
                    <Grid item xs={12} md={6} lg={4} key={topic.id}>
                        <Card>
                            <CardContent>
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


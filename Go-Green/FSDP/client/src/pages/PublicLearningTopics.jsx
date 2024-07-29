import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton } from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import global from '../global';

function PublicLearningTopics() {
    const [learningTopicList, setLearningTopicList] = useState([]);
    const [search, setSearch] = useState('');

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getLearningTopics = () => {
        http.get('/learning').then((res) => {
            setLearningTopicList(res.data);
        });
    };

    const searchLearningTopics = () => {
        http.get(`/learning?search=${search}`).then((res) => {
            setLearningTopicList(res.data);
        });
    };

    useEffect(() => {
        getLearningTopics();
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchLearningTopics();
        }
    };

    const onClickSearch = () => {
        searchLearningTopics();
    };

    const onClickClear = () => {
        setSearch('');
        getLearningTopics();
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Learning Topics
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input
                    value={search}
                    placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown}
                />
                <IconButton color="primary" onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary" onClick={onClickClear}>
                    <Clear />
                </IconButton>
            </Box>

            <Grid container spacing={5}>
                {learningTopicList.map((topic) => (
                    <Grid item xs={12} md={6} lg={4} key={topic.id}>
                        <Link to={`/learning/${topic.id}`} style={{ textDecoration: 'none' }}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                {topic.videoFile && (
                                    <Box className="aspect-ratio-container">
                                        <video controls style={{ width: '100%', height: '100%' }}>
                                            <source src={`${import.meta.env.VITE_FILE_BASE_URL}${topic.videoFile}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </Box>
                                )}
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', mb: 1 }}>
                                        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                                            {topic.title}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }} color="text.secondary">
                                        <Typography variant="body2" color="textSecondary">
                                            Published:
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(topic.createdAt).format(global.datetimeFormat)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default PublicLearningTopics;



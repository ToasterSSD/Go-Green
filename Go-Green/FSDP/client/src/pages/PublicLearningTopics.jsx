import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button, CircularProgress, Menu, MenuItem } from '@mui/material';
import { AccessTime, Search, Clear, MoreVert } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';

function PublicLearningTopics() {
    const [learningTopicList, setLearningTopicList] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [anchorEl, setAnchorEl] = useState(null); // State to handle menu
    const [selectedTopicId, setSelectedTopicId] = useState(null); // Track which topic is selected

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getLearningTopics = () => {
        setIsLoading(true); // Start loading
        http.get('/learning').then((res) => {
            setLearningTopicList(res.data);
            setIsLoading(false); // End loading
        });
    };

    const searchLearningTopics = () => {
        setIsLoading(true);
        http.get(`/learning?search=${search}`).then((res) => {
            setLearningTopicList(res.data);
            setIsLoading(false);
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

    const handleMenuOpen = (event, topicId) => {
        event.stopPropagation(); // Prevent card click
        if (anchorEl && selectedTopicId === topicId) {
            // If the same menu is open, close it
            handleMenuClose();
        } else {
            // Otherwise, open the menu
            setAnchorEl(event.currentTarget);
            setSelectedTopicId(topicId);
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTopicId(null);
    };

    const handleCardClick = (topicId) => {
        if (!anchorEl) {
            window.location.href = `/learning/${topicId}`;
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Learning Topics
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Dive into our exciting range of sustainability topics and discover how you can make a real difference for our planet—let's learn and grow together!
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
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

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={5}>
                    {learningTopicList.map((topic) => (
                        <Grid item xs={12} md={6} lg={4} key={topic.id}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        left: 0,
                                        bottom: 0,
                                        width: '0%',
                                        height: '4px',
                                        backgroundColor: '#93DAAB',
                                        transition: 'width 0.3s ease',
                                    },
                                    '&:hover::after': {
                                        width: '100%',
                                    },
                                }}
                                onClick={() => handleCardClick(topic.id)} // Navigate on card click
                            >
                                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                                    <IconButton
                                        aria-label="more"
                                        onClick={(e) => handleMenuOpen(e, topic.id)}
                                    >
                                        <MoreVert />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl) && selectedTopicId === topic.id}
                                        onClose={handleMenuClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: 48 * 4.5,
                                                width: '20ch',
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={handleMenuClose} component={Link} to="/feedback">
                                            Feedback
                                        </MenuItem>
                                    </Menu>
                                </Box>

                                {topic.videoFile && (
                                    <Box className="aspect-ratio-container">
                                        <video controls style={{ width: '100%', height: '100%' }}>
                                            <source src={`${import.meta.env.VITE_FILE_BASE_URL}${topic.videoFile}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </Box>
                                )}
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#E2F0E8' }}>
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
                        </Grid>
                    ))}
                </Grid>
            )}

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ my: 1 }}>
                    Quiz
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Challenge Your Eco-Wisdom with our one-time quiz!
                </Typography>
                <Link to="/quiz" style={{ textDecoration: 'none' }}>
                    <Button variant="contained">Take the Quiz</Button>
                </Link>
            </Box>
        </Box>
    );
}

export default PublicLearningTopics;

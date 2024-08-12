import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button, CircularProgress } from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';
import HeaderWithBackground from "../components/HeaderWithBackground";

import BookmarkIcon from '../assets/bookmark-icon.png';  
import BookmarkBorderIcon from '../assets/bookmark-border-icon.png';  

function PublicArticles() {
    const [articleList, setArticleList] = useState([]);
    const [search, setSearch] = useState('');
    const [bookmarks, setBookmarks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [filterBookmarks, setFilterBookmarks] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    const userId = 1; // Assume a logged-in user ID, replace with actual logi

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getArticles = () => {
        setIsLoading(true); // Start loading
        http.get('/article').then((res) => {
            setArticleList(res.data);
            setIsLoading(false); // End loading
        });
    };

    const searchArticles = () => {
        setIsLoading(true);
        http.get(`/article?search=${search}`).then((res) => {
            setArticleList(res.data);
            setIsLoading(false);
        });
    };

    const loadBookmarks = () => {
        http.get(`/bookmark/${userId}`).then((res) => {
            const bookmarkedArticles = res.data.map(article => article.id);
            setBookmarks(bookmarkedArticles);
        });
    };

    const toggleBookmark = (articleId) => {
        if (bookmarks.includes(articleId)) {
            http.delete(`/bookmark/${userId}/${articleId}`).then(() => {
                setBookmarks(bookmarks.filter(id => id !== articleId));
            });
        } else {
            http.post('/bookmark', { userId, articleId }).then(() => {
                setBookmarks([...bookmarks, articleId]);
            });
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const toggleFilterBookmarks = () => {
        setFilterBookmarks(!filterBookmarks);
    };

    useEffect(() => {
        getArticles();
        loadBookmarks();
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchArticles();
        }
    };

    const onClickSearch = () => {
        searchArticles();
    };

    const onClickClear = () => {
        setSearch('');
        getArticles();
    };

    const filteredArticles = filterBookmarks 
        ? articleList.filter(article => bookmarks.includes(article.id))
        : articleList;

    return (
        <Box>
            <HeaderWithBackground
                title="Green News"
                backgroundImage="/uploads/articleimage.jpg"
            />
            <Typography variant="h4" sx={{ my: 2, fontFamily: 'Raleway, sans-serif', color: 'inherit' }}>
                Stay Green, Stay Informed
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2, fontFamily: 'open-sans, sans-serif', color: 'inherit' }}>
                Discover and read positive news about environmentalism and sustainability revealing the latest developments in waste management technologies and sustainable practices. Stay informed with our daily updates and expert insights.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input
                    value={search}
                    placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown}
                    sx={{ color: 'inherit' }}
                />
                <IconButton color="primary" onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary" onClick={onClickClear}>
                    <Clear />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Button variant="contained" onClick={toggleEditMode}>
                    {editMode ? 'Stop Editing' : 'Edit Bookmarks'}
                </Button>
                <Button variant="contained" onClick={toggleFilterBookmarks}>
                    {filterBookmarks ? 'All Articles' : 'View Bookmarks'}
                </Button>
            </Box>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={5}>
                    {filteredArticles.map((article, i) => (
                        <Grid item xs={12} md={6} lg={4} key={article.id}>
                            <Card sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                position: 'relative',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                                '& a': {
                                    color: 'inherit',  // Ensure text color is consistent
                                    textDecoration: 'none',
                                },
                                '& a:hover': {
                                    color: 'inherit',  // Maintain text color on hover
                                }
                            }}>
                                {editMode && (
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleBookmark(article.id);
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                            zIndex: 1,
                                        }}
                                    >
                                        <img
                                            src={bookmarks.includes(article.id) ? BookmarkIcon : BookmarkBorderIcon}
                                            alt={bookmarks.includes(article.id) ? "Bookmarked" : "Bookmark"}
                                            style={{ width: '24px', height: '24px' }}
                                        />
                                    </IconButton>
                                )}
                                <Link to={`/public-article/${article.id}`}>
                                    {article.imageFile && (
                                        <Box className="aspect-ratio-container">
                                            <img
                                                alt="article"
                                                src={`${import.meta.env.VITE_FILE_BASE_URL}${article.imageFile}`}
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </Box>
                                    )}
                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#E0F0F8' }}>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: 'inherit' }}>
                                                {article.title}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }} color="text.secondary">
                                            <Typography variant="body2" color="textSecondary" sx={{ color: 'inherit' }}>
                                                Published:
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <AccessTime sx={{ mr: 1 }} />
                                                <Typography sx={{ color: 'inherit' }}>
                                                    {dayjs(article.createdAt).format(global.datetimeFormat)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography sx={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem', fontFamily: 'Nunito, sans-serif', color: 'inherit' }}>
                                            <strong>Topic: </strong>{article.category}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap', mt: 'auto', color: 'inherit' }}>
                                            <strong>By:</strong> {article.author}
                                        </Typography>
                                    </CardContent>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default PublicArticles;

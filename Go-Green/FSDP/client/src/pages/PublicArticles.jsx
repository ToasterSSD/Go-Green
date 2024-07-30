import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';
import HeaderWithBackground from "../components/HeaderWithBackground";


function PublicArticles() {
    const [articleList, setArticleList] = useState([]);
    const [search, setSearch] = useState('');

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getArticles = () => {
        http.get('/article').then((res) => {
            setArticleList(res.data);
        });
    };

    const searchArticles = () => {
        http.get(`/article?search=${search}`).then((res) => {
            setArticleList(res.data);
        });
    };

    useEffect(() => {
        getArticles();
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

    return (
        <Box>
         <HeaderWithBackground
        title="News articles"
        backgroundImage="/uploads/test.jpg" // Path to your background image
      />
            <Typography variant="h5" sx={{ my: 2 }}>
                Articles
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
                {articleList.map((article, i) => (
                    <Grid item xs={12} md={6} lg={4} key={article.id}>
                        <Link to={`/public-article/${article.id}`} style={{ textDecoration: 'none' }}>
                            <Card sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}>
                                {article.imageFile && (
                                    <Box className="aspect-ratio-container">
                                        <img
                                            alt="article"
                                            src={`${import.meta.env.VITE_FILE_BASE_URL}${article.imageFile}`}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </Box>
                                )}
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#F5F5F5' }}>
                                    <Box sx={{ display: 'flex', mb: 1 }}>
                                        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                                            {article.title}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }} color="text.secondary">
                                        <Typography variant="body2" color="textSecondary">
                                            Published:
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(article.createdAt).format(global.datetimeFormat)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography sx={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem', fontFamily: 'Nunito, sans-serif' }}>
                                        <strong>Topic: </strong>{article.category}
                                    </Typography>
                                    <Typography sx={{ whiteSpace: 'pre-wrap', mt: 'auto' }}>
                                        <strong>By:</strong> {article.author}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default PublicArticles;





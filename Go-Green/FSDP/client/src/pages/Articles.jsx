import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';
import HeaderWithBackground from "../components/HeaderWithBackground";

function Articles() {
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

    useEffect(() => {
        http.get('/article').then((res) => {
            console.log(res.data);
            setArticleList(res.data);
        });
    }, []);

    return (
        <Box>
         <HeaderWithBackground
        title="News"
        backgroundImage="/uploads/articleimage.jpg" // Path to your background image
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
                <Box sx={{ flexGrow: 1 }} />
                <Link to="/addarticle" style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>
                        Add
                    </Button>
                </Link>
            </Box>

            <Grid container spacing={5}>
                {
                    articleList.map((article, i) => (
                        <Grid item xs={12} md={6} lg={4} key={article.id}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                {
                                    article.imageFile && (
                                        <Box className="aspect-ratio-container">
                                            <img
                                                alt="article"
                                                src={`${import.meta.env.VITE_FILE_BASE_URL}${article.imageFile}`}
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </Box>
                                    )
                                }
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', mb: 1 }}>
                                        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Nunito, sans-serif', fontSize: '1.2rem' }}>
                                            <strong>Title: </strong>{article.title}
                                        </Typography>
                                        <Link to={`/editarticle/${article.id}`}>
                                            <IconButton color="primary" sx={{ padding: '4px' }}>
                                                <Edit />
                                            </IconButton>
                                        </Link>
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
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

export default Articles;









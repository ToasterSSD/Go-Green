import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import http from '../http';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../global';

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
    }
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
            <Typography variant="h5" sx={{ my: 2 }}>
                Articles
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary"
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Link to="/addarticle" style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>
                        Add
                    </Button>
                </Link>
            </Box>

            <Grid container spacing={2}>
                {
                    articleList.map((article, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={tutorial.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            {article.newsName}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(article.createdAt).format(global.datetimeFormat)}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {article.newsCat}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    )
}

export default Articles
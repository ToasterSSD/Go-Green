import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { AccessTime, Search, Clear, Edit, Delete } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';
import HeaderWithBackground from "../components/HeaderWithBackground";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Articles() {
    const [articleList, setArticleList] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [open, setOpen] = useState(false);
    const [articleIdToDelete, setArticleIdToDelete] = useState(null);
    const navigate = useNavigate();

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getArticles = () => {
        setIsLoading(true); // Set loading to true before fetching
        http.get('/article')
            .then((res) => {
                setArticleList(res.data);
            })
            .finally(() => {
                setIsLoading(false); // Set loading to false after fetching
            });
    };

    const searchArticles = () => {
        setIsLoading(true);
        http.get(`/article?search=${search}`)
            .then((res) => {
                setArticleList(res.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleOpen = (id) => {
        setArticleIdToDelete(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setArticleIdToDelete(null);
    };

    const deleteArticle = () => {
        http.delete(`/article/${articleIdToDelete}`)
            .then((res) => {
                console.log(res.data);
                setArticleList(articleList.filter(article => article.id !== articleIdToDelete));
                handleClose();
                toast.success('Article deleted successfully');
            })
            .catch((err) => {
                console.error(err);
                toast.error('Failed to delete article');
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

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={5}>
                    {articleList.map((article) => (
                        <Grid item xs={12} md={6} lg={4} key={article.id}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                                {article.imageFile && (
                                    <Box sx={{ position: 'relative' }} className="aspect-ratio-container">
                                        <img
                                            alt="article"
                                            src={`${import.meta.env.VITE_FILE_BASE_URL}${article.imageFile}`}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                        <IconButton
                                            sx={{ position: 'absolute', top: 8, right: 8 }}
                                            color="error"
                                            onClick={() => handleOpen(article.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                        <Link to={`/editarticle/${article.id}`}>
                                            <IconButton
                                                color="primary"
                                                sx={{ position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#30b854' }}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </Link>
                                    </Box>
                                )}
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', mb: 1 }}>
                                        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Nunito, sans-serif', fontSize: '1.2rem' }}>
                                            <strong>Title: </strong>{article.title}
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
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Article</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this article?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={deleteArticle}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </Box>
    );
}

export default Articles;

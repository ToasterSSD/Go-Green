import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import http from '../http';
import { AccessTime } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../global';

function Articles() {
    const [articleList, setArticleList] = useState([]);

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
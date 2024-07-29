import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../http';
import { Box, Typography, Container } from '@mui/material';

function ArticleDetails() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        http.get(`/article/${id}`)
            .then((res) => {
                setArticle(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    if (!article) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Typography variant="h3" component="h1" sx={{ my: 4, textAlign: 'center', fontWeight: 'bold' }}>
                {article.title}
            </Typography>
            {article.imageFile && (
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <img 
                        src={`${import.meta.env.VITE_FILE_BASE_URL}${article.imageFile}`} 
                        alt={article.title}
                        style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
                    />
                </Box>
            )}
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Published by: {article.author}
            </Typography>
            <Box sx={{ mt: 2 }}>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </Box>
        </Container>
    );
}

export default ArticleDetails;



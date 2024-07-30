import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import http from '../http';

function AnnouncementSignUp() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    http.get('/announcement/signups')
      .then(res => {
        setAnnouncements(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch announcements with sign-up button:', err);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Announcements with Sign Up
      </Typography>
      <Grid container spacing={2}>
        {announcements.map(announcement => (
          <Grid item xs={12} md={6} lg={4} key={announcement.id}>
            <Card>
              {announcement.imageFile && (
                <Box className="aspect-ratio-container">
                  <img
                    alt="announcement"
                    src={`${import.meta.env.VITE_FILE_BASE_URL}${announcement.imageFile}`}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>
              )}
              <CardContent>
                <Typography variant="h6">
                  {announcement.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', pb: 2 }}>
                  <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
                </Typography>
                <Button
                  component={Link}
                  to={`/announcement/${announcement.id}`}
                  variant="contained"
                  color="primary"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AnnouncementSignUp;

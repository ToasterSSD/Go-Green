import React from 'react';
import { Box, Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import SideNavbar from '../components/SideNavbar';

const posts = [
  { title: 'Eaque aut consequatur quia nulla sit.', status: 'published', createdAt: 'June 27, 2021 2:34 PM', category: 'Ut Optio Voluptas' },
  { title: 'Qui earum ipsum aliquid.', status: 'rejected', createdAt: 'April 29, 2021 7:08 AM', category: 'Porro Fugit Dolorem' },
  // Add more posts here
];

const AdminPanel = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideNavbar />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Posts
          </Typography>
          <Paper elevation={3} sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts.map((post, index) => (
                    <TableRow key={index}>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.status}</TableCell>
                      <TableCell>{post.createdAt}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <Visibility />
                        </IconButton>
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPanel;

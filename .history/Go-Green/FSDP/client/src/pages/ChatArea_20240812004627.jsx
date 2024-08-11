import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Input,
  Button,
  CircularProgress,
  Collapse,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  ThumbUp,
  ThumbDown,
  Comment,
  AccessTime,
  Edit,
  Search,
  Clear,
  AccountCircle,
  ReportProblem,
} from "@mui/icons-material";
import dayjs from "dayjs";
import UserContext from "../contexts/UserContext";
import HeaderWithBackground from "../components/HeaderWithBackground";
import http from "../http";

function ChatArea() {
  const [postList, setPostList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openComment, setOpenComment] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [reportDetails, setReportDetails] = useState({
    postId: null,
    type: "",
    description: "",
  });

  const { user } = useContext(UserContext);

  const getPosts = () => {
    setIsLoading(true);
    http.get("/chatarea").then((res) => {
      setPostList(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await http.post(`/chatarea/like/${postId}`);
      const updatedPost = res.data;

      setPostList((prevPostList) =>
        prevPostList.map((post) =>
          post.id === updatedPost.id
            ? {
                ...post,
                likes: updatedPost.likes,
                likedBy: updatedPost.likedBy,
                dislikes: updatedPost.dislikes,
                dislikedBy: updatedPost.dislikedBy,
                comments: post.comments,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const res = await http.post(`/chatarea/dislike/${postId}`);
      const updatedPost = res.data;

      setPostList((prevPostList) =>
        prevPostList.map((post) =>
          post.id === updatedPost.id
            ? {
                ...post,
                dislikes: updatedPost.dislikes,
                dislikedBy: updatedPost.dislikedBy,
                likes: updatedPost.likes,
                likedBy: updatedPost.likedBy,
                comments: post.comments,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error disliking the post:", error);
    }
  };

  const toggleCommentSection = (postId) => {
    setOpenComment(openComment === postId ? null : postId);
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const res = await http.post(`/chatarea/comment/${postId}`, {
        content: commentText,
      });

      const newComment = res.data;

      setPostList((prevPostList) =>
        prevPostList.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [...post.comments, newComment],
                commentCount: post.comments.length + 1, // Update comment count
              }
            : post
        )
      );

      setCommentText(""); // Clear the comment text after submission
      setOpenComment(null); // Close the comment box after submission
    } catch (error) {
      console.error("Error adding the comment:", error);
    }
  };

  const handleReportClick = (postId) => {
    setReportDetails({ ...reportDetails, postId });
    setOpenReportDialog(true);
  };

  const handleReportSubmit = async () => {
    try {
      // Make sure the report details have the necessary data
      console.log("Submitting report:", {
        postId: reportDetails.postId,
        type: reportDetails.type,
        description: reportDetails.description,
      });

      // This sends the POST request to your backend to create a report
      const res = await http.post(
        "/reports",
        {
          postId: reportDetails.postId,
          type: reportDetails.type,
          description: reportDetails.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        console.log("Report submitted successfully");
        handleReportDialogClose(); // Close the report dialog if submission is successful
      } else {
        console.error("Failed to submit report", res);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  const handleReportDialogClose = () => {
    setOpenReportDialog(false);
    setReportDetails({ postId: null, type: "", description: "" });
  };

  return (
    <Box>
      <HeaderWithBackground
        title="Chat Area"
        backgroundImage="/uploads/test.jpg" // Update with your background image path
      />

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Input
          value={search}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              http.get(`/chatarea?search=${search}`).then((res) => {
                setPostList(res.data);
              });
            }
          }}
        />
        <IconButton
          color="primary"
          onClick={() =>
            http
              .get(`/chatarea?search=${search}`)
              .then((res) => setPostList(res.data))
          }
        >
          <Search />
        </IconButton>
        <IconButton
          color="primary"
          onClick={() => {
            setSearch("");
            getPosts();
          }}
        >
          <Clear />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Link to="/addchat" style={{ textDecoration: "none" }}>
          <Button variant="contained">Create Post</Button>
        </Link>
      </Box>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {postList.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card sx={{ display: "flex", mb: 2 }}>
                {post.imageFile && (
                  <Box
                    component="img"
                    sx={{ width: "30%", objectFit: "cover" }}
                    src={`${import.meta.env.VITE_FILE_BASE_URL}${
                      post.imageFile
                    }`}
                    alt="post"
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", mb: 1 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {post.title || "No Title"}
                    </Typography>
                    {user?.id === post.userId && (
                      <Link to={`/editchat/${post.id}`}>
                        <IconButton color="primary" sx={{ padding: "4px" }}>
                          <Edit />
                        </IconButton>
                      </Link>
                    )}
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    color="text.secondary"
                  >
                    <AccountCircle sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {post.user?.name || "Unknown User"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    color="text.secondary"
                  >
                    <AccessTime sx={{ mr: 1 }} />
                    <Typography>
                      {post.createdAt
                        ? dayjs(post.createdAt).format("MMM D, YYYY h:mm A")
                        : "Unknown Date"}
                    </Typography>
                  </Box>
                  <Typography sx={{ whiteSpace: "pre-wrap", pb: 2 }}>
                    {post.content.length > 150 ? (
                      <>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `${post.content.substring(0, 150)}...`,
                          }}
                        />
                        <Link to={`/chatarea/${post.id}`}>Read More</Link>
                      </>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    )}
                  </Typography>
                  {post.link && (
                    <Typography sx={{ pb: 2 }}>
                      <Box component="span" sx={{ fontWeight: "bold" }}>
                        Sign up here:{" "}
                      </Box>
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post.link}
                      </a>
                    </Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => handleLike(post.id)}
                        color={
                          post.likedBy?.includes(user?.id)
                            ? "primary"
                            : "default"
                        }
                      >
                        <ThumbUp
                          sx={{
                            color: post.likedBy?.includes(user?.id)
                              ? "green"
                              : "inherit",
                          }}
                        />
                      </IconButton>
                      <Typography>{post.likes}</Typography>
                      <IconButton
                        onClick={() => handleDislike(post.id)}
                        color={
                          post.dislikedBy?.includes(user?.id)
                            ? "primary"
                            : "default"
                        }
                      >
                        <ThumbDown
                          sx={{
                            color: post.dislikedBy?.includes(user?.id)
                              ? "red"
                              : "inherit",
                          }}
                        />
                      </IconButton>
                      <Typography>{post.dislikes}</Typography>
                      <IconButton onClick={() => toggleCommentSection(post.id)}>
                        <Comment />
                      </IconButton>
                      <Typography>{post.comments?.length || 0}</Typography>
                      <IconButton onClick={() => handleReportClick(post.id)}>
                        <ReportProblem color="error" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Collapse in={openComment === post.id}>
                    <TextField
                      fullWidth
                      label="Add a comment"
                      variant="outlined"
                      sx={{ mt: 2 }}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleCommentSubmit(post.id);
                        }
                      }}
                    />
                    {post.comments &&
                      post.comments.map((comment, index) => (
                        <Box
                          key={index}
                          sx={{
                            mt: 2,
                            p: 2,
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                          }}
                        >
                          <Typography variant="body2" color="textSecondary">
                            <strong>
                              {comment.user?.name || "Unknown User"}
                            </strong>{" "}
                            -{" "}
                            {dayjs(comment.createdAt).format(
                              "MMM D, YYYY h:mm A"
                            )}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {comment.content.replace(/<\/?[^>]+(>|$)/g, "")}
                          </Typography>
                        </Box>
                      ))}
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openReportDialog} onClose={handleReportDialogClose}>
        <DialogTitle>Report Post</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type of Report</InputLabel>
            <Select
              value={reportDetails.type}
              onChange={(e) =>
                setReportDetails({ ...reportDetails, type: e.target.value })
              }
            >
              <MenuItem value="Harassment">Harassment</MenuItem>
              <MenuItem value="Spam">Spam</MenuItem>
              <MenuItem value="Hate Speech">Hate Speech</MenuItem>
              <MenuItem value="Violence">Violence</MenuItem>
              <MenuItem value="Self Harm">Self Harm</MenuItem>
              <MenuItem value="Sharing Personal Information">
                Sharing Personal Information
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            margin="normal"
            label="Additional Information"
            value={reportDetails.description}
            onChange={(e) =>
              setReportDetails({
                ...reportDetails,
                description: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReportDialogClose}>Cancel</Button>
          <Button
            onClick={handleReportSubmit}
            color="error"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ChatArea;

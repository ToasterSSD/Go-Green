import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../http";
import { Box, Typography, Button, Paper } from "@mui/material";

const ReportDetail = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await http.get(`/reports/${reportId}`);
        setReport(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching report details:", error);
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const handleDeletePost = async () => {
    try {
      await http.delete(`/chatarea/${report.ChatArea.id}`);
      await http.put(`/reports/${reportId}`, { status: "DELETED" });
      navigate("/reports");
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!report) {
    return <div>Report not found.</div>;
  }

  const { ChatArea } = report;

  return (
    <Paper elevation={3} sx={{ p: 4, my: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Report Details
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">
          <strong>Title:</strong> {ChatArea.title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Content:</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{ __html: ChatArea.content }}
        />
        {ChatArea.link && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>Link:</strong>{" "}
            <a href={ChatArea.link} target="_blank" rel="noopener noreferrer">
              {ChatArea.link}
            </a>
          </Typography>
        )}
        {ChatArea.imageFile && (
          <Box
            component="img"
            src={`${import.meta.env.VITE_FILE_BASE_URL}${ChatArea.imageFile}`}
            alt="Post Image"
            sx={{ mt: 2, maxWidth: "100%", height: "auto", borderRadius: 2 }}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeletePost}
        >
          Delete Post
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/reports")}
        >
          Back
        </Button>
      </Box>
    </Paper>
  );
};

export default ReportDetail;

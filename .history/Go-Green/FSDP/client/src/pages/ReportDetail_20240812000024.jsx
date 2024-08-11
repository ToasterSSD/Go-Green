import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../http";
import { Box, Typography, Button } from "@mui/material";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!report) {
    return <div>Report not found.</div>;
  }

  const { ChatArea } = report;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Report Details
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">{ChatArea.title}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {ChatArea.content}
        </Typography>
        {ChatArea.link && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Link:</strong> <a href={ChatArea.link}>{ChatArea.link}</a>
          </Typography>
        )}
        {ChatArea.imageFile && (
          <Box
            component="img"
            src={`${import.meta.env.VITE_FILE_BASE_URL}${ChatArea.imageFile}`}
            alt="Post Image"
            sx={{ mt: 2, maxWidth: "100%", height: "auto" }}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/reports")}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ReportDetail;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import http from "../http";

function ReportDetail() {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await http.get(`/reports/${reportId}`);
        setReport(res.data);
      } catch (error) {
        console.error("Error fetching report details:", error);
      }
    };

    fetchReport();
  }, [reportId]);

  if (!report) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Report Details
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Title: {report.ChatArea.title}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Content:</strong>
          </Typography>
          <Typography variant="body2">{report.ChatArea.content}</Typography>
          {report.ChatArea.link && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Link:</strong>{" "}
              <a
                href={report.ChatArea.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {report.ChatArea.link}
              </a>
            </Typography>
          )}
          {report.ChatArea.imageFile && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>Image:</strong>
              </Typography>
              <img
                alt="post"
                src={`${import.meta.env.VITE_FILE_BASE_URL}${
                  report.ChatArea.imageFile
                }`}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => navigate("/reports")}
          >
            Back to Reports
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ReportDetail;

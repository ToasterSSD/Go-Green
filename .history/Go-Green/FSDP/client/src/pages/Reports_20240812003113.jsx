import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import http from "../http";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Reports() {
  const [reports, setReports] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.roles.includes("ADMIN")) {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    try {
      const res = await http.get("/reports");
      setReports(res.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

 const handleAction = async (reportId, action) => {
   try {
     const report = reports.find((r) => r.id === reportId);

     if (!report) {
       console.error(`Report with ID ${reportId} not found`);
       return;
     }

     if (action === "DELETED") {
       // Delete the post from ChatArea
       await http.delete(`/chatarea/${report.postId}`);
     }

     // Update the report status
     const res = await http.put(`/reports/${reportId}`, { status: action });

     // Update UI immediately after the action
     setReports((prevReports) =>
       prevReports.map((r) =>
         r.id === reportId ? { ...r, status: action } : r
       )
     );
   } catch (error) {
     console.error(`Error updating report status to ${action}:`, error);
   }
 };

  if (!user?.roles.includes("ADMIN")) {
    return (
      <Typography>You do not have permission to view this page.</Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Reports
      </Typography>
      <Grid container spacing={3}>
        {reports.map((report) => (
          <Grid item xs={12} key={report.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {report.ChatArea?.title || "Unknown Title"}
                </Typography>
                <Typography variant="body1">
                  <strong>Type:</strong> {report.type}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Description:</strong> {report.description}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Status:</strong> {report.status}
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/report-detail/${report.id}`)}
                  >
                    Read
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAction(report.id, "RESOLVED")}
                    disabled={report.status !== "PENDING"}
                  >
                    Leave it (RESOLVED)
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAction(report.id, "DELETED")}
                    disabled={report.status !== "PENDING"}
                  >
                    Delete (DELETED)
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Reports;

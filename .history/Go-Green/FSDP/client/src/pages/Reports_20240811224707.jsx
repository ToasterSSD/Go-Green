import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import http from "../http";
import dayjs from "dayjs";

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    http.get("/reports").then((res) => {
      setReports(res.data);
    });
  }, []);

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
                  {report.type} - {report.user?.name || "Unknown User"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Reported Post ID: {report.postId}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(report.createdAt).format("MMM D, YYYY h:mm A")}
                </Typography>
                <Typography sx={{ mt: 2 }}>{report.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Reports;

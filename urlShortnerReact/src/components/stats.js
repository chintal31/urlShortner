import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function Stats(props) {
  function handleBack() {
    props.showForm();
  }
  return (
    <React.Fragment>
      <Button onClick={handleBack} variant="contained" sx={{ mb: 3 }}>
        Back
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow key={1}>
              <TableCell sx={{ fontWeight: "600" }}>Original Url</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Short Url</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Visited</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>
                Shortned Attempted
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.stats && props.stats.length > 0 ? (
              props.stats.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <a href={`${row.originalUrl}`} target="_blank">
                      {row.originalUrl}
                    </a>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <a
                      href={`/redirect/${encodeURIComponent(row.short_url)}`}
                      onClick={handleBack}
                      target="_blank"
                    >
                      {row.short_url}
                    </a>
                  </TableCell>
                  <TableCell>{row.visited}</TableCell>
                  <TableCell>{row.shortenedAttempt}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key={3}>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>No Data found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

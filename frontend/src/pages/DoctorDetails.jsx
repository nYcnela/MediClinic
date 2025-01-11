import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AdminNavbar from "../components/AdminNavbar";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "800px",
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up("sm")]: {
    width: "75%"
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px"
  })
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
    fontSize: "0.8rem"
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "& > *": {
      padding: theme.spacing(1),
      fontSize: "0.8rem"
    }
  }
}));

export default function DoctorDetails() {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axiosPrivate
      .get(`/doctor/${id}?specializations=true`)
      .then(({ data }) => setDoctor(data.doctor))
      .catch(console.error);
  }, [id, axiosPrivate]);

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <AdminNavbar />
      <StyledBox>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Szczegóły lekarza
        </Typography>
        {doctor && (
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell>Nazwa:</StyledTableCell>
                  <StyledTableCell>{`${doctor.label}`}</StyledTableCell>
                </StyledTableRow>
           
                <StyledTableRow>
                  <StyledTableCell>Specjalizacje</StyledTableCell>
                  <StyledTableCell>
                    {doctor.specializations?.map((spec) => spec.name).join(", ")}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </StyledBox>
    </AppTheme>
  );
}
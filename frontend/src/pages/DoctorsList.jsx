import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, CssBaseline } from "@mui/material";
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

function DoctorsList() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axiosPrivate.get("/doctor/list")
      .then(({ data }) => setDoctors(data.doctors))
      .catch(console.error);
  }, [axiosPrivate]);

  const handleProfile = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <AdminNavbar />
      <StyledBox>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Lista lekarzy
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell><strong>Lekarz</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>Akcje</strong></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <StyledTableRow key={doctor.value}>
                  <StyledTableCell>{doctor.label}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="contained" onClick={() => handleProfile(doctor.value)}>
                      Profil
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledBox>
    </AppTheme>
  );
}

export default DoctorsList;
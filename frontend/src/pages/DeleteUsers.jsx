import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CssBaseline,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AdminNavbar from "../components/AdminNavbar";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { GradientContainer } from "./sign-in/SignIn";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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

export default function DeleteUsers() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/user/all");
        setUsers(Array.isArray(response.data.users) ? response.data.users : []);
      } catch (error) {
        console.error(error);
        setUsers([]);
      }
    };
    fetchData();
  }, [axiosPrivate]);

  const handleDelete = async (id) => {
    try {
       const response = await axiosPrivate.delete(`/user/${id}`);
       console.log(response);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {   
        console.error(error);
        }

    
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.role === filter;
  });

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <AdminNavbar/>
        <StyledBox>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Usuń użytkowników
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="filter-label">Filtruj według roli</InputLabel>
            <Select
              labelId="filter-label"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Filtruj według roli"
            >
              <MenuItem value="all">Wszyscy</MenuItem>
              <MenuItem value="user">Użytkownicy</MenuItem>
              <MenuItem value="doctor">Lekarze</MenuItem>
              <MenuItem value="admin">Admini</MenuItem>
            </Select>
          </FormControl>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell><strong>Imię</strong></StyledTableCell>
                  <StyledTableCell><strong>Nazwisko</strong></StyledTableCell>
                  <StyledTableCell><strong>Rola</strong></StyledTableCell>
                  <StyledTableCell align="center"><strong>Akcje</strong></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell>{user.name}</StyledTableCell>
                    <StyledTableCell>{user.surname}</StyledTableCell>
                    <StyledTableCell>{user.role}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(user.id)}
                        disabled={user.role === "admin"}
                      >
                        Usuń
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
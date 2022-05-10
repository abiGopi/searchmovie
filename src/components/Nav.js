import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Input } from "@mui/material";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@mui/material/TextField";
import useStyles from "./useStyles";
import { movieData } from "../reducers/movieAction";

export const Navbar = () => {
  const classes = useStyles();
  const API_KEY = process.env.REACT_APP_KEY;
  const [search, setSearch] = useState("a");
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const movieDataObject = useSelector((state) => state.movies.movieData);
  const columns = [
    { id: "id", label: "Id", minWidth: 170 },
    { id: "title", label: "Title", minWidth: 100 },
    {
      id: "overview",
      label: "Overview",
      minWidth: 170,
      align: "right",
    },
    {
      id: "original_language",
      label: "Original Language",
      minWidth: 170,
      align: "right",
    },
    {
      id: "release_date",
      label: "Release Year ",
      minWidth: 170,
      align: "right",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (search) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`
      )
        .then((data) => data.json())
        .then((data) => {
          setList(data?.results);
          dispatch(
            movieData({
              details: data?.results,
            })
          );
        });
    }
  }, [dispatch, search]);
  return (
    <Grid container className={classes.tableContent}>
      <AppBar>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Movie Finder
          </Typography>
          &nbsp;&nbsp;
          <TextField
            id="searchMovie"
            variant={"standard"}
            onChange={handleSearch}
            placeholder="Search Movie by name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </AppBar>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.map((movies) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={movies.id}>
                    {columns.map((column) => {
                      const value = movies[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  );
};

import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(1),
    // display: "flex",
    flexGrow: 1,
    // alignItems: "center",
    minWidth: "100%",
  },
  input: {
    // marginLeft: theme.spacing(1),
    fontSize: "2em",
    // maxWidth: "20em",
    // minWidth: "5em",
    // width: "20em",
    // flexGrow: 1,
  },
}));

function SearchBar(props) {
  const theme = props.theme;
  const classes = useStyles();

  const [isDisabled, setIsDisabled] = useState(true);

  const handleTextChange = (event) => {
    const text = event.target.value;
    setIsDisabled(text === null || text === "");
  };

  return (
    // <React.Fragment>
    <FormControl variant={props.variant} className={classes.root}>
      <TextField
        name="name"
        defaultValue={props.value}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                style={{ marginBottom: theme.spacing(1) }}
                disabled={isDisabled}
                type="submit"
                aria-label="search"
              >
                <SearchIcon fontSize="default" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        autoFocus
        onChange={handleTextChange}
        noValidate
        autoComplete="on"
        variant={props.variant}
        id="search-text-field"
        label="Search"
        className={classes.input}
      />
    </FormControl>
    // </React.Fragment>
  );
}

export default SearchBar;

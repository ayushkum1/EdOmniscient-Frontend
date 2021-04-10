import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  FormControl,
} from "@material-ui/core";
import { styles } from "../common/SelectStyles";
import { regionList as allStateList } from "../common/constants";

const useStyles = makeStyles((theme) => styles(theme));

function StateSelect(props) {
  const [regionList, setRegionList] = useState([]);
  // const [state, setState] = useState("");

  const classes = useStyles();

  // const handleStateSelect = (event) => {
  //   setState(event.target.value);
  // };

  // useEffect(() => {
  //   if (props.state !== undefined) setState(props.state);
  // }, [props.state]);

  useEffect(() => {
    // TODO: API call to get state/city list from backend
    // Temporarily setting static values.
    setRegionList(allStateList);
    // if (props.state !== undefined) setState(props.state);
  }, [props.state]);

  const menuProps = {
    classes: {
      paper: classes.menuPaper,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  const { value, changeHandler } = props;

  return (
    <>
      <FormControl variant={props.variant} className={classes.root}>
        <InputLabel id="region-select-label">Region</InputLabel>
        <Select
          id="select-search-by-city"
          labelId="region-select-label"
          label="region"
          name="region"
          onChange={changeHandler}
          value={value}
          MenuProps={menuProps}
        >
          {regionList.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default StateSelect;

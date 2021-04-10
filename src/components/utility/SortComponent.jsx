import React from "react";
import { Chip, makeStyles } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RupeeIcon from "./RupeeIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "wrap",
    // padding: theme.spacing(2),
    justifyContent: "space-evenly",
  },
  chip: {
    [theme.breakpoints.down("sm")]: {
      margin: "1em",
    },
  },
}));

const sortOptions = [
  {
    id: "rating",
    label: "Rating",
    icon: <StarIcon />,
  },
  {
    id: "fees_asc",
    label: "Fees (low to high)",
    icon: <RupeeIcon />,
  },
  {
    id: "fees_desc",
    label: "Fees (high to low)",
    icon: <RupeeIcon />,
  },
  {
    id: "accreditation",
    label: "Accreditation",
    icon: <CheckCircleOutlineIcon />,
  },
];

function SortComponent(props) {
  const classes = useStyles();
  // const [selected, setSelected] = useState();
  const { selected, handleApply: setSelected } = props;

  const handleSortSelect = (text) => {
    if (selected === text) setSelected();
    else setSelected(text);
    console.log(selected);
    // props.handleApply(selected);
    setTimeout(() => {
      props.refForm.current.requestSubmit();
    }, 10);
  };

  return (
    <div className={classes.root}>
      {sortOptions.map((op) => {
        return (
          <Chip
            className={classes.chip}
            key={op.id}
            label={op.label}
            onClick={() => handleSortSelect(op.id)}
            variant={selected === op.id ? "default" : "outlined"}
            color="secondary"
            icon={op.icon}
          />
        );
      })}
    </div>
  );
}

export default SortComponent;

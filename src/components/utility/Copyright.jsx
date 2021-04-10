import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Copyright(props) {
  const align = props.align ?? "center";
  let year = new Date().getFullYear();
  return (
    <Typography variant="body2" color="textSecondary" align={align}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        Brains in JARS
      </Link>
      {" ("}
      {year}
      {" - "}
      {year + 1}
      {")."}
    </Typography>
  );
}

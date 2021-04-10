import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { LinearProgress, useMediaQuery, Popover } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useToken } from "../../../services/useToken";
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";

import { SnackbarProvider, useSnackbar } from "notistack";
import {
  deleteReviewRecord,
  getAllReviews,
} from "../../Channappa_Mirgale/services/review-helper";

const useStyles = makeStyles((theme) => ({
  dataGridHeader: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  customToolbar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: theme.spacing(1),
  },
}));

const snackbarProps = (variant) => ({
  variant: String(variant).toLowerCase(),
  anchorOrigin: {
    horizontal: "left",
    vertical: "bottom",
  },
  transitionDuration: 5000,
});

function ManageReviews(props) {
  const { curInstitute } = props;

  const classes = useStyles();
  const theme = useTheme();
  const mobileBP = useMediaQuery(theme.breakpoints.down("sm"));
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const [reviews, setReviews] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [popover, setPopover] = useState("");

  const [rowSelection, setRowSelection] = useState([]);

  const { token } = useToken();

  useEffect(() => {
    setLoading(true);

    getAllReviews(token)
      .then((resp) => {
        console.log(resp.data);
        setReviews(resp.data);
      })
      .catch((err) => {
        setReviews([]);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      setReviews([]);
    };
  }, [curInstitute, refresh, token]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleRowSelection = (e) => {
    console.log(e.selectionModel);
    setRowSelection(e.selectionModel);
  };

  const handleRemove = () => {
    rowSelection.forEach((id) => {
      setLoading(true);

      deleteReviewRecord(token, id)
        .then((resp) => {
          handleRefresh();
          enqueueSnackbar(
            resp.data?.message,
            snackbarProps(resp.data?.messageType)
          );
        })
        .catch((err) => {
          console.log(err.response);
          enqueueSnackbar(
            "Could not delete this review!",
            snackbarProps("error")
          );
        })
        .finally(() => {
          setLoading(false);
        });
    });

    setRowSelection([]);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "content",
      headerName: "Content",
      flex: 1,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "createdDateTime",
      headerName: "Created At",
      width: 200,
      headerClassName: classes.dataGridHeader,
      valueFormatter: ({ value }) => {
        if (value !== null) {
          let date = new Date(value);

          let dt = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();

          let hrs = date.getHours();
          let min = date.getMinutes();

          return `${dt < 10 ? "0" + dt : dt}-${
            month < 10 ? "0" + month : month
          }-${year}  ${hrs < 10 ? "0" + hrs : hrs} : ${
            min < 10 ? "0" + min : min
          } hrs`;
        } else {
          return "NA";
        }
      },
    },
    {
      field: "modifiedDateTime",
      headerName: "Modified At",
      width: 200,
      headerClassName: classes.dataGridHeader,
      valueFormatter: ({ value }) => {
        if (value !== null) {
          let date = new Date(value);

          let dt = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();

          let hrs = date.getHours();
          let min = date.getMinutes();

          return `${dt < 10 ? "0" + dt : dt}-${
            month < 10 ? "0" + month : month
          }-${year}  ${hrs < 10 ? "0" + hrs : hrs} : ${
            min < 10 ? "0" + min : min
          } hrs`;
        } else {
          return "NA";
        }
      },
    },
  ];

  function CustomLoadingOverlay() {
    return (
      <GridOverlay>
        <div style={{ position: "absolute", top: 0, width: "100%" }}>
          <LinearProgress color="secondary" />
        </div>
      </GridOverlay>
    );
  }

  const CustomToolbar = (props) => {
    return (
      <div className={classes.customToolbar}>
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: "1rem",
            justifyContent: "flex-start",
          }}
        >
          {rowSelection.length > 0 ? (
            <Button
              onClick={handleRemove}
              startIcon={!mobileBP && <DeleteIcon />}
              variant="contained"
              style={{
                color: theme.palette.error.contrastText,
                backgroundColor: theme.palette.error.main,
              }}
            >
              {mobileBP ? <DeleteIcon /> : "Remove"}
            </Button>
          ) : null}

          <Button
            onClick={() => setRefresh(!refresh)}
            startIcon={!mobileBP && <AutorenewIcon />}
            variant="outlined"
          >
            {mobileBP ? <AutorenewIcon /> : "Refresh"}
          </Button>
        </div>
        <GridToolbar />
      </div>
    );
  };

  return (
    <div>
      <SnackbarProvider>
        <DataGrid
          columns={columns}
          rows={reviews}
          pageSize={20}
          autoHeight
          loading={loading}
          checkboxSelection
          onSelectionModelChange={handleRowSelection}
          disableSelectionOnClick
          onRowClick={(params) => {
            setPopover(params.row.content);
            setAnchorEl(params.element);
          }}
          components={{
            Toolbar: CustomToolbar,
            LoadingOverlay: CustomLoadingOverlay,
          }}
        />

        <Popover
          id={Boolean(anchorEl) ? "simple-popover" : undefined}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => {
            setAnchorEl(null);
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography
            style={{
              padding: theme.spacing(2),
              maxWidth: "25em",
            }}
          >
            {popover}
          </Typography>
        </Popover>
      </SnackbarProvider>
    </div>
  );
}

export default ManageReviews;

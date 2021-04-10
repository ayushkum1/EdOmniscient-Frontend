import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { LinearProgress, useMediaQuery } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useToken } from "../../../services/useToken";
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";
import { SnackbarProvider, useSnackbar } from "notistack";
import {
  deleteAcademicEvent,
  getAcademicCalendar,
} from "../../../services/academics.service";
import AcademicForm from "../../ayush/forms/AcademicForm/AcademicForm";

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

function ManageAcademics(props) {
  const { curInstitute } = props;

  const classes = useStyles();
  const theme = useTheme();
  const mobileBP = useMediaQuery(theme.breakpoints.down("sm"));
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const [academicEvents, setAcademicEvents] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const [rowSelection, setRowSelection] = useState([]);

  const { token } = useToken();

  useEffect(() => {
    setLoading(true);

    getAcademicCalendar(token, curInstitute)
      .then((resp) => {
        console.log(resp.data);
        setAcademicEvents(resp.data);
      })
      .catch((err) => {
        console.log(err?.response);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      setAcademicEvents([]);
      setRowSelection([]);
    };
  }, [curInstitute, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleRowSelection = (e) => {
    console.log(e.selectionModel);
    setRowSelection(e.selectionModel);
  };

  const handleRemove = () => {
    setLoading(true);

    rowSelection.forEach((id) => {
      setLoading(true);
      deleteAcademicEvent(token, curInstitute, id)
        .then((resp) => {
          console.log(resp.data);
          enqueueSnackbar(resp.data, snackbarProps("success"));
          handleRefresh();
        })
        .catch((err) => {
          console.log(err.response);
          enqueueSnackbar("Could not delete events", snackbarProps("error"));
        })
        .finally(() => {
          setRowSelection([]);
          setLoading(false);
        });
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerClassName: classes.dataGridHeader,
    },

    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 150,
      headerClassName: classes.dataGridHeader,
      renderCell: (params) => (
        <img
          src={params.row.imageUrl}
          alt={"event iamge"}
          style={{ width: "80px", height: "80px", objectFit: "contain" }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 350,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "description",
      headerName: "Description",
      width: 350,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      headerClassName: classes.dataGridHeader,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => {
              setEditItem(params.row);
              setOpen(true);
            }}
            color="primary"
          >
            <EditIcon />
          </Button>
        </>
      ),
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
          <Button
            onClick={() => setOpen(true)}
            startIcon={!mobileBP && <AddIcon />}
            variant="contained"
            color="secondary"
          >
            {mobileBP ? <AddIcon /> : "Add new event"}
          </Button>

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
          rows={academicEvents}
          pageSize={20}
          autoHeight
          loading={loading}
          checkboxSelection
          onSelectionModelChange={handleRowSelection}
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
            LoadingOverlay: CustomLoadingOverlay,
          }}
        />

        {curInstitute && (
          <AcademicForm
            open={open}
            onClose={() => {
              setOpen(false);
              setEditItem(null);
            }}
            token={token}
            instId={curInstitute}
            row={editItem}
            isEdit={editItem !== null}
            refresh={handleRefresh}
            showSuccess={() =>
              enqueueSnackbar(
                "Event added successfully",
                snackbarProps("success")
              )
            }
            showError={() =>
              enqueueSnackbar("Could not add new event", snackbarProps("error"))
            }
          />
        )}
      </SnackbarProvider>
    </div>
  );
}

export default ManageAcademics;

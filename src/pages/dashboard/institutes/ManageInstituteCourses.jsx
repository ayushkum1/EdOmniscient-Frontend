import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { LinearProgress, useMediaQuery } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useToken } from "../../../services/useToken";
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";
import { SnackbarProvider, useSnackbar } from "notistack";
import {
  getAllCoursesShort,
  getCoursesOfInstitute,
  patchInstiuteCourses,
} from "../../../services/courses.service";
import InstituteCourseSelect from "./InstituteCourseSelect";

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

function ManageInstituteCourses(props) {
  const { curInstitute } = props;

  const classes = useStyles();
  const theme = useTheme();
  const mobileBP = useMediaQuery(theme.breakpoints.down("sm"));
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const [courses, setCourses] = useState([]);

  const [selectDialogOpen, setSelectDialogOpen] = useState(false);
  const [courseList, setCourseList] = useState([]);

  const [rowSelection, setRowSelection] = useState([]);

  const { token } = useToken();

  useEffect(() => {
    setLoading(true);

    getCoursesOfInstitute(curInstitute)
      .then((resp) => {
        console.log(resp.data);
        setCourses(resp.data);
      })
      .catch((err) => {
        console.log(err?.response);
        setCourses([]);
      })
      .finally(() => {
        setLoading(false);
      });

    getAllCoursesShort(token)
      .then((resp) => setCourseList(resp.data))
      .catch((err) => setCourseList([]))
      .finally(() => setLoading(false));

    return () => {
      setCourses([]);
      setCourseList([]);
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
    patchInstiuteCourses(token, curInstitute, {
      op: "remove",
      courses: rowSelection,
    })
      .then((resp) => {
        enqueueSnackbar(
          resp.data.message,
          snackbarProps(resp.data.messageType)
        );
        handleRefresh();
      })
      .catch((err) => {
        enqueueSnackbar(
          err.response.data.message,
          snackbarProps(err.response.data.messageType)
        );
      })
      .finally(() => {
        setRowSelection([]);
        setLoading(false);
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
      field: "photoUrl",
      headerName: "Image",
      width: 150,
      headerClassName: classes.dataGridHeader,
      renderCell: (params) => (
        <img
          src={params.row.photoUrl}
          alt="course image"
          style={{ width: "80px", height: "80px", objectFit: "contain" }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      headerClassName: classes.dataGridHeader,
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
            onClick={() => setSelectDialogOpen(true)}
            startIcon={!mobileBP && <LibraryAddIcon />}
            variant="contained"
            color="primary"
          >
            {mobileBP ? <LibraryAddIcon /> : "Add from list"}
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
          rows={courses}
          pageSize={20}
          autoHeight
          loading={loading}
          checkboxSelection
          onSelectionModelChange={handleRowSelection}
          components={{
            Toolbar: CustomToolbar,
            LoadingOverlay: CustomLoadingOverlay,
          }}
        />

        {curInstitute && (
          <InstituteCourseSelect
            open={selectDialogOpen}
            onClose={() => setSelectDialogOpen(false)}
            token={token}
            instituteId={curInstitute}
            courseList={courseList}
            enqueueSnackbar={enqueueSnackbar}
            snackbarProps={snackbarProps}
            refresh={handleRefresh}
          />
        )}
      </SnackbarProvider>
    </div>
  );
}

export default ManageInstituteCourses;

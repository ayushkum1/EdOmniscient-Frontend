import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";
import {
  Button,
  Container,
  LinearProgress,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { getAllCourses, deleteCourse } from "../../../services/courses.service";
import CourseForm from "../../ayush/forms/CourseForm/CourseForm";
import { useToken } from "../../../services/useToken";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

const useStyles = makeStyles((theme) => ({
  customToolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1),
  },

  iconBtn: {
    boxShadow: "0 0 10px -2px rgb(0 0 0 / 60%)",
  },
  errIconBtn: {
    color: theme.palette.error.main,
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

function ManageCourses(props) {
  const classes = useStyles();
  const theme = useTheme();
  const mobileBP = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [row, setRow] = useState(null);
  const [courseId, setCourseId] = useState();

  const [isUpdate, setIsUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const [courses, setCourses] = useState([]);

  const emptyForm = {
    id: "",
    name: "",
    description: "",
    photoUrl: "",
    fees: "",
    duration: "",
  };

  const { enqueueSnackbar } = useSnackbar();

  const { token } = useToken();

  useEffect(() => {
    setLoading(true);
    getAllCourses(token)
      .then((resp) => {
        const retVal = resp.data.map((c) => {
          return {
            id: c.id,
            name: c.name,
            description: c.description,
            photoUrl: c.photoUrl,
            fees: c.fees,
            duration: c.duration,
          };
        });
        setCourses(retVal);
        setLoading(false);
      })
      .catch((err) => {
        const errData = err.response.data;
        console.log(errData);

        enqueueSnackbar(errData.message, snackbarProps(errData.messageType));
        setLoading(false);
      });

    return () => {
      setCourses([]);
    };
  }, [token, refresh]);

  const handleDelete = (courseId) => {
    setLoading(true);
    deleteCourse(token, courseId)
      .then((resp) => {
        console.log(resp.data);
        enqueueSnackbar(
          "Course deleted successfully",
          snackbarProps("success")
        );
      })
      .catch((err) => {
        console.log(err.response);
        enqueueSnackbar("Could not delete this course", snackbarProps("error"));
      })
      .finally(() => {
        setLoading(false);
        setDeleteDialogOpen(false);
        setRefresh(!refresh);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "photoUrl", headerName: "Photo Url", width: 150 },
    { field: "fees", headerName: "Fees", width: 120 },
    {
      field: "duration",
      headerName: "Duration",
      width: 110,
      renderCell: (params) => `${params.row.duration} Months`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => {
              setIsUpdate(true);
              setRow(params.row);
              setOpen(true);
            }}
            size="small"
            color="primary"
          >
            <EditIcon />
          </Button>
          <Button
            onClick={() => {
              console.log(params.row.id);
              setCourseId(params.row.id);
              setDeleteDialogOpen(true);
            }}
            size="small"
            color="secondary"
          >
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  function CustomLoadingOverlay() {
    return (
      <GridOverlay>
        <div style={{ position: "absolute", top: 0, width: "100%" }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  }

  const CustomToolbar = (props) => {
    return (
      <div className={classes.customToolbar}>
        <Container
          style={{ display: "inline-flex", flexWrap: "wrap", gap: "1rem" }}
        >
          <Button
            startIcon={!mobileBP && <AddIcon />}
            onClick={() => {
              setIsUpdate(false);
              setRow(emptyForm);
              setOpen(true);
            }}
            variant="contained"
            color="primary"
          >
            {mobileBP ? <AddIcon /> : "Add new"}
          </Button>
          <Button
            onClick={() => setRefresh(!refresh)}
            startIcon={!mobileBP && <AutorenewIcon />}
            variant="outlined"
          >
            {mobileBP ? <AutorenewIcon /> : "Refresh"}
          </Button>
        </Container>
        <GridToolbar />
      </div>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={courses}
        pageSize={10}
        autoHeight
        loading={loading}
        components={{
          Toolbar: CustomToolbar,
          LoadingOverlay: CustomLoadingOverlay,
        }}
      ></DataGrid>
      {row !== null && (
        <>
          <CourseForm
            open={open}
            onClose={() => {
              setRow(null);
              setOpen(false);
            }}
            row={row}
            isUpdate={isUpdate}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </>
      )}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        handleDelete={() => handleDelete(courseId)}
        message="Are you sure you want to delete this course?"
      />
    </div>
  );
}

export default ManageCourses;

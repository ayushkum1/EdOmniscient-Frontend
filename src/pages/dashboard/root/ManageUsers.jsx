import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
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
import { useToken } from "../../../services/useToken";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { deleteUser, getAllUsers } from "../../../services/users.service";

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

function ManageUsers(props) {
  const classes = useStyles();
  const theme = useTheme();
  const mobileBP = useMediaQuery(theme.breakpoints.down("sm"));

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [userId, setUserId] = useState();

  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const { token } = useToken();

  useEffect(() => {
    setLoading(true);

    getAllUsers(token)
      .then((resp) => {
        const retVal = resp.data.map((u) => {
          return {
            id: u.email,
            firstName: u.firstName,
            lastName: u.lastName,
            address: `${u.streetAddr}, ${u.city}, ${u.state} - ${u.pinCode}`,
            // city: u.city,
            // state: u.state,
            // pinCode: u.pinCode,
          };
        });

        setUsers(retVal);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => setLoading(false));

    return () => {
      setUsers([]);
    };
  }, [token, refresh]);

  const handleDelete = (userId) => {
    setLoading(true);
    console.log(userId);
    deleteUser(token, userId)
      .then((resp) => {
        enqueueSnackbar(
          resp.data.message,
          snackbarProps(resp.data.messageType)
        );
        setRefresh(!refresh);
      })
      .catch((err) => {
        if (err.response.status !== 500) {
          enqueueSnackbar(
            err.response.data.message,
            snackbarProps(err.response.data.messageType)
          );
        } else {
          enqueueSnackbar(
            "Unable to delete! User might be managing an institute.",
            snackbarProps("error")
          );
        }
      })
      .finally(() => {
        setLoading(false);
        setDeleteDialogOpen(false);
      });
  };

  const columns = [
    { field: "id", headerName: "Email", width: 200 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "address", headerName: "Address", flex: 1 },
    // { field: "city", headerName: "City", width: 150 },
    // { field: "state", headerName: "State", width: 150 },
    // { field: "pinCode", headerName: "Pin Code", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => {
              console.log(params.row.id);
              setUserId(params.row.id);
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
          {/* <Button
            startIcon={!mobileBP && <AddIcon />}
            onClick={() => {
              setRow(emptyForm);
              setOpen(true);
            }}
            variant="contained"
            color="primary"
          >
            {mobileBP ? <AddIcon /> : "Add new"}
          </Button> */}
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
        rows={users}
        pageSize={10}
        autoHeight
        loading={loading}
        components={{
          Toolbar: CustomToolbar,
          LoadingOverlay: CustomLoadingOverlay,
        }}
      ></DataGrid>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        handleDelete={() => handleDelete(userId)}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
}

export default ManageUsers;

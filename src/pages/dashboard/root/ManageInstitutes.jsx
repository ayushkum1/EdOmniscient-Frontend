import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";
import {
  getAllInstitutes,
  getAllInstAdmin,
  saveInstitute,
  deleteInstitute,
} from "../../../services/institutes.service";
import {
  Button,
  Container,
  LinearProgress,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import AddorEditInstituteForm from "./AddorEditInstituteForm";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { useToken } from "../../../services/useToken";

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

function ManageInstitutes(props) {
  const theme = props.theme;
  const classes = useStyles();
  const mobileBP = useMediaQuery(theme.breakpoints.down("sm"));
  const [institutes, setInstitutes] = useState([]);
  const [instAdmins, setInstAdmins] = useState([]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [instituteId, setInstituteId] = useState();

  const [formOpen, setFormOpen] = useState(false);
  const emptyForm = {
    id: NaN,
    name: "",
    nick: "",
    streetAddr: "",
    city: "",
    state: "",
    pinCode: "",
    region: "",
    instAdmin: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [isUpdate, setIsUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const { token } = useToken();

  useEffect(() => {
    setLoading(true);
    getAllInstitutes(token)
      .then((resp) => {
        const retVal = resp.data.map((r) => {
          return {
            id: r.id,
            name: r.name,
            nick: r.nick,
            streetAddr: r.location.streetAddr,
            city: r.location.geography.city,
            state: r.location.geography.state,
            pinCode: r.location.geography.pinCode,
            region: r.location.geography.region,
            instAdmin: r.instituteAdmin.email,
          };
        });
        setInstitutes(retVal);
        setLoading(false);
      })
      .catch((err) => {
        const errData = err.response?.data;
        console.log(errData?.message);

        enqueueSnackbar(errData?.message, snackbarProps(errData?.messageType));
        setLoading(false);
      });

    getAllInstAdmin(token)
      .then((resp) => {
        setInstAdmins(resp.data);
      })
      .catch((err) => {
        enqueueSnackbar(
          err.response.data.message,
          snackbarProps(err.response.data.messageType)
        );
      });
    return () => {
      setInstitutes([]);
      setInstAdmins([]);
    };
  }, [token, refresh]);

  const handleSave = (form) => {
    saveInstitute(token, form, isUpdate)
      .then((resp) => {
        setRefresh(!refresh);
        console.log(resp.data);
        enqueueSnackbar(
          resp.data.message,
          snackbarProps(resp.data.messageType)
        );
      })
      .catch((err) => {
        enqueueSnackbar(
          err.response.data.message,
          snackbarProps(err.response.data.messageType)
        );
        setLoading(false);
      });
    setFormOpen(false);
  };

  const handleDelete = (instituteId) => {
    deleteInstitute(token, instituteId)
      .then((resp) => {
        setRefresh(!refresh);
        console.log(resp.data);
        enqueueSnackbar(
          resp.data.message,
          snackbarProps(resp.data.messageType)
        );
      })
      .catch((err) => {
        enqueueSnackbar(
          err.response.data.message,
          snackbarProps(err.response.data.messageType)
        );
      });
    setInstituteId(undefined);
    setDeleteDialogOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "nick", headerName: "Nick", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "pinCode", headerName: "Pin Code", width: 120 },
    { field: "region", headerName: "Region", width: 150 },
    { field: "instAdmin", headerName: "Institute Admin", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => {
              setIsUpdate(true);
              setForm(params.row);
              setFormOpen(true);
            }}
            size="small"
            color="primary"
          >
            <EditIcon />
          </Button>
          <Button
            onClick={() => {
              console.log(params.row.id);
              setInstituteId(params.row.id);
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

  const CustomToolbar = () => {
    return (
      <div className={classes.customToolbar}>
        <Container
          style={{ display: "inline-flex", flexWrap: "wrap", gap: "1rem" }}
        >
          <Button
            startIcon={!mobileBP && <AddIcon />}
            onClick={() => {
              setIsUpdate(false);
              setForm(emptyForm);
              setFormOpen(true);
            }}
            variant="contained"
            color="primary"
          >
            {mobileBP ? <AddIcon /> : "Add new"}
          </Button>
          <Button
            onClick={() => setRefresh(!refresh)}
            startIcon={<AutorenewIcon />}
          >
            Refresh
          </Button>
        </Container>
        <GridToolbar />
      </div>
    );
  };

  function CustomLoadingOverlay() {
    return (
      <GridOverlay>
        <div style={{ position: "absolute", top: 0, width: "100%" }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={institutes}
        pageSize={10}
        // checkboxSelection
        // onRowSelected={(newSelection) => setForm(newSelection.data)}
        autoHeight
        loading={loading}
        components={{
          Toolbar: CustomToolbar,
          LoadingOverlay: CustomLoadingOverlay,
        }}
      ></DataGrid>

      <AddorEditInstituteForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        form={form}
        handleFormChange={(form) => {
          setIsUpdate(isUpdate);
          setForm(form);
          handleSave(form);
        }}
        instAdmins={instAdmins}
      />
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        handleDelete={() => handleDelete(instituteId)}
        message="Are you sure you want to delete this institute?"
      />
    </div>
  );
}

export default ManageInstitutes;

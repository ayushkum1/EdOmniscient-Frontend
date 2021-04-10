import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import {
  Button,
  Container,
  LinearProgress,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";
import { useToken } from "../../../services/useToken";
import { useSnackbar } from "notistack";
import DeleteConfirmDialog from "../root/DeleteConfirmDialog";
import {
  deleteMember,
  getMembers,
  patchMemberStatus,
} from "../../Channappa_Mirgale/services/member-helper";

const useStyles = makeStyles((theme) => ({
  dataGridHeader: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  dataGridCellsApproved: {
    backgroundColor: theme.palette.success.light,
  },
  dataGridCellsPending: {
    backgroundColor: theme.palette.warning.light,
  },
  dataGridCellsRejected: {
    backgroundColor: theme.palette.error.light,
  },
  customToolbar: {
    display: "flex",
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

function ManageMembers(props) {
  const { curInstitute } = props;
  const classes = useStyles();
  const theme = useTheme();
  const mobileBP = useMediaQuery(theme.breakpoints.down("sm"));

  const [members, setMembers] = useState([]);

  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberId, setMemberId] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const { token } = useToken();

  useEffect(() => {
    setLoading(true);
    getMembers(token, curInstitute)
      .then((resp) => {
        console.log(resp.data);
        setMembers(resp.data);
      })
      .catch((err) => {
        console.log(err.response);
        setMembers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props, token, refresh, curInstitute]);

  const handleDelete = (memberId) => {
    deleteMember(token, curInstitute, memberId)
      .then((resp) => {
        console.log(resp.data);
        enqueueSnackbar(resp.data.message, snackbarProps("success"));
      })
      .catch((err) => {
        console.log(err.response.data);
        enqueueSnackbar(
          "Could not delete this record!",
          snackbarProps("error")
        );
      })
      .finally(() => {
        setRefresh(!refresh);
      });
    setDeleteDialogOpen(false);
  };

  const handlePatch = (memberId, op) => {
    setLoading(true);
    patchMemberStatus(token, curInstitute, memberId, op)
      .then((resp) => {
        console.log(resp.data);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
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
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: classes.dataGridHeader,
      cellClassName: (params) =>
        (params.row.status === "APPROVED" && classes.dataGridCellsApproved) ||
        (params.row.status === "PENDING" && classes.dataGridCellsPending) ||
        (params.row.status === "REJECTED" && classes.dataGridCellsRejected),
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "memberType",
      headerName: "Member Type",
      width: 150,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "prn",
      headerName: "PRN",
      width: 150,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "courseId",
      headerName: "Course ID",
      width: 150,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "year",
      headerName: "Year",
      width: 120,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "publicEmail",
      headerName: "Public Email",
      width: 120,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "publicPhone",
      headerName: "Public Phone",
      width: 120,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "userEmail",
      headerName: "userEmail",
      width: 120,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "actions",
      headerName: "Action",
      width: 230,
      // flex: 1,
      headerClassName: classes.dataGridHeader,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          {params.row.status === "PENDING" ||
          params.row.status === "REJECTED" ? (
            <Tooltip title="Approve" placement="top">
              <Button
                onClick={() => {
                  setMemberId(params.row.id);
                  handlePatch(params.row.id, "approved");
                }}
                size="small"
                color="primary"
              >
                <CheckIcon />
              </Button>
            </Tooltip>
          ) : null}

          <Tooltip title="Reject" placement="top">
            <Button
              onClick={() => {
                console.log(params.row.id);
                setMemberId(params.row.id);
                // setDeleteDialogOpen(true);
                handlePatch(params.row.id, "rejected");
              }}
              size="small"
              style={{
                color: theme.palette.error.main,
              }}
            >
              <CloseIcon />
            </Button>
          </Tooltip>

          <Tooltip title="Delete" placement="top">
            <Button
              onClick={() => {
                console.log(params.row.id);
                setMemberId(params.row.id);
                setDeleteDialogOpen(true);
              }}
              size="small"
              style={{
                color: theme.palette.error.main,
              }}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </div>
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
        <Container
          style={{ display: "inline-flex", flexWrap: "wrap", gap: "1rem" }}
        >
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
        rows={members}
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
        handleDelete={() => handleDelete(memberId)}
        message="Are you sure you want to delete this member?"
      />
    </div>
  );
}

export default ManageMembers;

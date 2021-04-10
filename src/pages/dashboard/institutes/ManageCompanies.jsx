import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { LinearProgress, useMediaQuery } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import AddCompanyForm from "./AddCompanyForm";
import { useToken } from "../../../services/useToken";
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";
import {
  getAllCompanies,
  getCompaniesByInstitute,
  patchCompanies,
} from "./upload_helper/company.service";
import CompanySelect from "./CompanySelect";
import { SnackbarProvider, useSnackbar } from "notistack";

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

function ManageCompanies(props) {
  const { curInstitute } = props;

  const classes = useStyles();
  const theme = useTheme();
  const mobileBP = useMediaQuery(theme.breakpoints.down("sm"));
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [selectDialogOpen, setSelectDialogOpen] = useState(false);
  const [companyList, setCompanyList] = useState([]);

  const [rowSelection, setRowSelection] = useState([]);

  const { token } = useToken();

  useEffect(() => {
    setLoading(true);

    getCompaniesByInstitute(token, curInstitute)
      .then((resp) => {
        console.log(resp.data);
        setCompanies(resp.data);
      })
      .catch((err) => {
        console.log(err.response);
        setCompanies([]);
      })
      .finally(() => {
        setLoading(false);
      });

    getAllCompanies()
      .then((resp) => setCompanyList(resp.data))
      .catch((err) => setCompanyList([]))
      .finally(() => setLoading(false));
    return () => {
      setCompanies([]);
      setCompanyList([]);
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
    patchCompanies(token, curInstitute, {
      op: "remove",
      companies: rowSelection,
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
      field: "logoUrl",
      headerName: "Logo",
      width: 150,
      headerClassName: classes.dataGridHeader,
      renderCell: (params) => (
        <img
          src={params.row.logoUrl}
          alt={"company logo"}
          style={{ width: "80px", height: "80px", objectFit: "contain" }}
        />
      ),
      // cellClassName: (params) => ()
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      headerClassName: classes.dataGridHeader,
    },
    {
      field: "websiteUrl",
      headerName: "Website",
      width: 350,
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
          <Button
            onClick={() => setOpen(true)}
            startIcon={!mobileBP && <AddIcon />}
            variant="contained"
            color="secondary"
          >
            {mobileBP ? <AddIcon /> : "Add new Company"}
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
          rows={companies}
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
          <>
            <AddCompanyForm
              open={open}
              onClose={() => setOpen(false)}
              token={token}
              instituteId={curInstitute}
              enqueueSnackbar={enqueueSnackbar}
              snackbarProps={snackbarProps}
              refresh={handleRefresh}
            />
            <CompanySelect
              open={selectDialogOpen}
              onClose={() => setSelectDialogOpen(false)}
              token={token}
              instituteId={curInstitute}
              companyList={companyList}
              enqueueSnackbar={enqueueSnackbar}
              snackbarProps={snackbarProps}
              refresh={handleRefresh}
            />
          </>
        )}
      </SnackbarProvider>
    </div>
  );
}

export default ManageCompanies;

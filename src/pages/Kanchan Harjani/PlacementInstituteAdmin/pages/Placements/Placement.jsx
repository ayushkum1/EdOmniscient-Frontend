import React, { useState, useEffect } from "react";
import PlacementForm from "./PlacementForm";
import { addPlacementRecord } from "../../services/placement_service";
import { getPlacementRecords } from "../../services/placement_service";
import { deletePlacementRecord } from "../../services/placement_service";
import { updatePlacementRecord } from "../../services/placement_service";

import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  useTheme,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useToken } from "../../../../../services/useToken";
import { getAllCoursesShort } from "../../../../../services/courses.service";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "id", label: "Placement Id" },
  { id: "noPlacedStudents", label: "No. of Placed Students" },
  { id: "totalStudents", label: "Total Students" },
  { id: "maxLPAOffered", label: "Max LPA Offered" },
  { id: "avgLPAOffered", label: "Avg LPA Offered" },
  { id: "courseName", label: "Course" },
  { id: "batch", label: "Batch" },
  { id: "year", label: "Year" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Placement(props) {
  const { curInstitute } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { token } = useToken();

  const [courseList, setCourseList] = useState([]);

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      console.log(items);
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    retrieveRecords(curInstitute);
    getCourseList();
  }, [refresh, curInstitute]);

  const getCourseList = () => {
    getAllCoursesShort(token)
      .then((resp) => {
        setCourseList(resp.data);
      })
      .catch((err) => {
        setCourseList([]);
      });
  };

  const retrieveRecords = async (instituteId) => {
    await getPlacementRecords(token, instituteId)
      .then((response) => {
        let result = response.data.map((r) => {
          return {
            id: r.id,
            noPlacedStudents: r.noPlacedStudents,
            totalStudents: r.totalStudents,
            maxLPAOffered: r.maxLPAOffered,
            avgLPAOffered: r.avgLPAOffered,
            courseName: r.courseName,
            batch: r.batch,
            year: r.year,
          };
        });
        setRecords(result);
      })
      .catch((e) => {
        console.log(e);
      });

    return function cleanUp() {
      new AbortController().abort();
    };
  };

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.courseName.toUpperCase().includes(target.value)
          );
      },
    });
  };

  const savePlacementRecord = async (instituteId, placement) => {
    placement.year = placement.year.getFullYear();
    await addPlacementRecord(token, instituteId, placement)
      .then((response) => {
        console.log("added");

        console.log(response.data);
        setRefresh(!refresh);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const changePlacementRecord = async (instituteId, placement) => {
    await updatePlacementRecord(token, instituteId, placement)
      .then((response) => {
        console.log("updated");
        console.log(response.data);
        setRefresh(!refresh);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addOrEdit = (placement, resetForm) => {
    console.log("from addOrEdit ", placement.id);
    console.log(placement);

    const instId = curInstitute;

    if (placement.id == 0) savePlacementRecord(instId, placement);
    else changePlacementRecord(instId, placement);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    await deletePlacementRecord(token, curInstitute, id);
    setRefresh(!refresh);
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Records By Course"
            className={classes.searchInput}
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />

          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>

        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.noPlacedStudents}</TableCell>
                <TableCell>{item.totalStudents}</TableCell>
                <TableCell>{item.maxLPAOffered}</TableCell>
                <TableCell>{item.avgLPAOffered}</TableCell>
                <TableCell>{item.courseName}</TableCell>
                <TableCell>{item.batch}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this record?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(item.id);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>

      <Popup
        title="Placement Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <PlacementForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
          courseList={courseList}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

import React, { useState, useEffect } from "react";
import PlacementService from "./placementService";

const PlacementDetails = () => {
  const [placementRecords, setPlacementRecords] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [noOfRecords, setNoOfRecords] = useState("");
  const [batch, setBatch] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    retrieveRecords();
  }, []);

  const retrieveRecords = () => {
    PlacementService.getAllPlacementRecords()
      .then((response) => {
        setPlacementRecords(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRecords();
    setCurrentRecord(null);
    setCurrentIndex(-1);
  };

  const setActiveRecord = (record, index) => {
    setCurrentRecord(record);
    setCurrentIndex(index);
  };

  const findByBatches = () => {
    PlacementService.getLastNPlacementRecords(noOfRecords)
      .then((response) => {
        setPlacementRecords(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByBatchAndYear = () => {
    PlacementService.getPlacementRecordsByBatchAndYear(batch, year)
      .then((response) => {
        setPlacementRecords(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // export default {
  //   retrieveRecords,
  //   findByBatches,
  //   findByBatcheAndYear,
  // };
};
export default PlacementDetails;

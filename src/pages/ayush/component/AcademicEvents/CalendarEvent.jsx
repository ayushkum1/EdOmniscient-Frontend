import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, makeStyles } from "@material-ui/core";
import { TablePagination } from "@material-ui/core";
import noCalendarImg from "../../.../../../../assets/calendar.png";

const useStyle = makeStyles((theme) => ({
  calendarEventStyle: {
    textAlign: "center",
  },
  cardStyles: {
    height: "auto",
    minWidth: 200,
    border: "1px orange solid",
  },
  headDivStyle: {
    height: "auto",
    minWidth: 200,
    borderBottom: "1px black solid",
    textAlignment: "center",
  },
  photoDivStyle: {
    minHeight: 100,
    minWidth: 100,
    padding: "10px",
    borderBottom: "1px black solid",
    textAlignment: "center",
  },
  bottomDivStyle: {
    height: "auto",
    minWidth: 200,
    textAlignment: "center",
  },
  paraFontStyle: {
    fontSize: "20px",
  },
  calendarEventDisplayStyle: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "end",
  },
}));

export default function CalendarEvent(props) {
  const styles = useStyle();

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        className={styles.calendarEventDisplayStyle}
      >
        <Card className={styles.cardStyles}>
          <CardContent className={styles.calendarEventStyle}>
            <div className={styles.headDivStyle}>
              <p className={styles.paraFontStyle}>
                {props.listClick
                  ? props.listDate
                  : props.selectedDate.toDateString()}
              </p>
              {props.name && (
                <>
                  <div className={styles.headDivStyle}></div>
                  <p className={styles.paraFontStyle}>{props.name}</p>
                </>
              )}
            </div>
            <div className={styles.photoDivStyle}>
              {props.image && props.image !== "" ? (
                <img
                  src={props.image}
                  height="300px"
                  width="300px"
                  alt="event photo"
                />
              ) : (
                <img
                  src={noCalendarImg}
                  alt="no event"
                  height="250px"
                  width="250px"
                />
              )}
            </div>
            <div className={styles.bottomDivStyle}>
              <p className={styles.paraFontStyle}>{props.description}</p>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        {props.count > 0 ? (
          <div className="position-relative">
            <TablePagination
              component="div"
              count={props.count}
              onChangePage={props.handlePageChange}
              page={props.currentPage}
              rowsPerPage={props.batchSize}
              rowsPerPageOptions={[]}
            />
          </div>
        ) : null}
      </Grid>
    </Grid>
  );
}

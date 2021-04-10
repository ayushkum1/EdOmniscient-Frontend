import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import { regionList } from "../components/common/constants";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getAllInstitutesShort } from "../services/institutes.service";
import { Container } from "@material-ui/core";
import { useHistory } from "react-router";

function InstitutesPage(props) {
  const history = useHistory();

  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    getAllInstitutesShort()
      .then((resp) => {
        console.log(resp.data);
        let regionInstMap = new Map();
        resp.data.forEach((i) => {
          if (regionInstMap.has(i.region)) {
            regionInstMap.get(i.region).push({ id: i.id, name: i.name });
          } else {
            regionInstMap.set(i.region, [{ id: i.id, name: i.name }]);
          }

          return regionInstMap;
        });

        const insts = Array.from(regionInstMap, ([region, insts]) => ({
          region,
          insts,
        }));

        console.log(insts);

        setInstitutes(insts);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <Container maxWidth="md" style={{ padding: "1em" }}>
      <Grid container spacing={1} justify="center">
        {institutes.map((r) => (
          <Grid item xs={12} key={r.region}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">{r.region}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  {r.insts.map((i) => (
                    <Grid item sm={4} key={i.id}>
                      <Button
                        onClick={() => history.push(`/institutes/${i.id}`)}
                        fullWidth
                        variant="contained"
                      >
                        {i.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default InstitutesPage;

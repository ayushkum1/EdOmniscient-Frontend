import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
function SimpleRating(props) {
  const [value, setValue] = React.useState();
  

  return (
    <div>
      <Box component="fieldset" mb={0.1} borderColor="transparent">
        <Typography component="legend"></Typography>
        <Box component="fieldset" mb={0.1} borderColor="transparent">
        <Rating 
        name="read-only"
        value={props.value} 
        readOnly
        precision={0.5} />
      </Box>
      </Box>
    </div>
  );
}
export default SimpleRating;
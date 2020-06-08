import React from "react";
import { Typography, Grid } from "@material-ui/core";
import LocalinkMap from "../../components/map/Map";

function SearchPage() {
  return (
    // <Grid container spacing={8}>
    //   <Grid item sm={7}>
    //     Some content here
    //   </Grid>
    //   <Grid item sm={5}>
    //     <Grid container spacing={8}>
    //       <Grid
    //         item
    //         sm={12}
    //         style={{ position: "relative", height: "50vh", width: "50vw" }}
    //       >
    //         <LocalinkMap />
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Typography>Hello</Typography>
      </Grid>
      <Grid item container direction="row" spacing={5}>
        <Grid item sm={12} style={{ position: "relative", height: "80vh" }}>
          <LocalinkMap />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SearchPage;

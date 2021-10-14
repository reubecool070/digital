import type { NextPage } from "next";
import TopHeader from "../src/Layout/TopHeader";
import Button from "../src/Components/Button";
import Grid from "../src/Components/Grid";

const Home: NextPage = () => {
  return (
    <div>
      {/* <TopHeader /> */}
      <Grid container spacing={3}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log("clicked")}
            // startIcon={<div>hlw </div>}
          >
            Primary
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => console.log("clicked")}
            // startIcon={<div>hlw </div>}
          >
            Secondary
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => console.log("clicked")}
            // startIcon={<div>hlw </div>}
          >
            Outlined
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => console.log("clicked")}
            // startIcon={<div>hlw </div>}
          >
            Outlined
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => console.log("clicked")}>
            Secondary
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => console.log("clicked")}>
            Secondary
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

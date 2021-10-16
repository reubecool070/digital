import type { NextPage } from "next";
import MainHeader from "../src/Layout/MainHeader";
import TopHeader from "../src/Layout/TopHeader";
import Layout from "../src/Layout/Layout";
import Grid from "../src/Components/Grid";
import SideNav from "../src/Layout/SideNav";
import Box from "../src/Components/Box";
import Paper from "../src/Components/Paper";

const Home: NextPage = () => {
  return (
    <div>
      <TopHeader />
      <MainHeader />
      <Box color="default" bgColor="grey">
        <Layout>
          <Paper>
            <Grid container>
              <Grid item xs={2}>
                <SideNav />
              </Grid>
              <Grid item xs={10}>
                Slider
              </Grid>
            </Grid>
          </Paper>
        </Layout>
      </Box>
    </div>
  );
};

export default Home;

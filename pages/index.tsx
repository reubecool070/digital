import type { NextPage } from "next";
import MainHeader from "../src/Layout/MainHeader";
import TopHeader from "../src/Layout/TopHeader";
import Layout from "../src/Layout/Layout";
import Grid from "../src/Components/Grid";
import SideNav from "../src/Layout/SideNav";
import Box from "../src/Components/Box";
import Paper from "../src/Components/Paper";
import Carousel from "../src/Layout/Carousel";

const Home: NextPage = () => {
  return (
    <div>
      <TopHeader />
      <MainHeader />
      <Box color="default" bgColor="grey">
        <Layout>
          <Paper>
            <Grid container>
              <Grid item lg={2}>
                <SideNav />
              </Grid>
              <Grid item lg={10}>
                <Carousel />
              </Grid>
            </Grid>
          </Paper>
        </Layout>
      </Box>
      <Layout>
        <Grid container>
          <Grid item lg={2}>
            top Deals
          </Grid>
          <Grid item lg={10}>
            Products
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
};

export default Home;

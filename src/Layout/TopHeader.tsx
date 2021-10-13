import React from "react";
import Box from "../Components/Box";
import Grid from "../Components/Grid";
import Link from "next/link";

const TopHeader = () => {
  return (
    <>
      <Box color="default" bgColor="primary">
        <Grid container spacing={1} justify="flex-end">
          <Grid item>
            <Link href="/about-us">About Us</Link>
          </Grid>
          <Grid item>
            <Link href="/about-us">FAQ</Link>
          </Grid>
          <Grid item>
            <Link href="/about-us">Terms and Conditions</Link>
          </Grid>
          <Grid item>
            <Link href="/about-us">Contact Us</Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TopHeader;

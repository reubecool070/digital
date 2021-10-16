import React from "react";
import Box from "../Components/Box";
import Grid from "../Components/Grid";
import Link from "next/link";
import Typography from "../Components/Typography";

const TopHeader = () => {
  return (
    <>
      <Box color="default" bgColor="grey">
        <Grid container spacing={1} justify="flex-end">
          <Grid item>
            <Link href="/about-us" passHref>
              <Typography variant="subtitle2">About Us</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/faq" passHref>
              <Typography variant="subtitle2">FAQ</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/termsandcondition" passHref>
              <Typography variant="subtitle2">Terms and Conditions</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/contacts" passHref>
              <Typography variant="subtitle2">Contact Us</Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TopHeader;

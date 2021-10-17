import React from "react";
import Grid from "../Components/Grid";
import Image from "next/image";
import logo from "../images/ultimatelogo.png";
import Button from "../Components/Button";
import Layout from "../Layout/Layout";
import { BsSearch } from "react-icons/bs";
import InputBase from "../Components/InputBase";
import { styled } from "@mui/styles";
import Paper from "../Components/Paper";

const StyledInputBase = styled(InputBase)(() => ({
  color: "inherit",
  backgroundColor: "#fff",
  "& .MuiInputBase-input": {
    padding: "8px 8px 8px calc(1em + 32px)",
    // vertical padding + font size from searchIcon
    paddingLeft: `48px`,
    // transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const MainHeader = () => {
  const handleSearch = (event: any) => {
    console.log("event", event.target.value);
  };

  const handleKeyUp = (event: any) => {
    if (event.key === "Enter") {
      console.log("pressed Enter");
    }
    console.log("key up", event.target.value);
  };

  return (
    <>
      <Layout>
        <Grid container>
          <Grid container item lg={2} md={3} xs={12} justify="center">
            <Image src={logo} alt="" placeholder="blur" />
          </Grid>
          <Grid
            item
            xs={6}
            lg={7}
            md={5}
            container
            justify="center"
            alignContent="center"
          >
            <Paper
              elevation={2}
              style={{
                position: "relative",
                margin: "0 5%",
                width: "100%",
              }}
            >
              <div
                style={{
                  padding: "0px 16px",
                  height: "100%",
                  top: 0,
                  position: "absolute",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BsSearch />
              </div>
              <StyledInputBase
                fullWidth
                onChange={(event: any) => handleSearch(event)}
                placeholder="Search Product…"
                onKeyUp={handleKeyUp}
                inputProps={{ "aria-label": "search" }}
              />
            </Paper>
          </Grid>
          <Grid
            item
            xs={6}
            lg={3}
            md={4}
            container
            alignContent="center"
            justify="space-between"
          >
            <Button color="white" variant="outlined">
              Sign Up
            </Button>
            <Button variant="contained">Log In</Button>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default MainHeader;

import React from "react";
import List from "../Components/List/List";
import ListItem from "../Components/List/ListItem";
import ListItemText from "../Components/List/ListItemText";
import ListItemSecondaryAction from "../Components/List/ListItemSecondaryAction";
import { MdKeyboardArrowRight, MdTableRows } from "react-icons/md";
import Typography from "../Components/Typography";
import Grid from "../Components/Grid";

const SideNav = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const navBar = [
    "Visiting Cards",
    "Stationary",
    "Marketing Tools",
    "Business Essentials",
    "Events",
    "Signage",
    "Gifts & Promotion",
    "Flex",
    "Apparels",
    "Digital Print",
  ];

  return (
    <div>
      <List
        component="nav"
        aria-label="subject list"
        subheader={
          <Grid
            container
            alignItems="center"
            style={{
              padding: "0 16px",
            }}
          >
            <MdTableRows />
            <Typography
              variant="subtitle1"
              gutterBottom={true}
              style={{ marginLeft: "20px", marginTop: "5px" }}
            >
              CATEGORIES
            </Typography>
          </Grid>
        }
      >
        {navBar?.map((item: string, index: number) => {
          return (
            <ListItem
              key={index}
              button={true}
              component="button"
              selected={selectedIndex === index}
              onClick={(event: any) => handleListItemClick(event, index)}
            >
              <ListItemText primary={item} />
              <ListItemSecondaryAction>
                <MdKeyboardArrowRight />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default SideNav;

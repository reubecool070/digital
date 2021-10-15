import type { NextPage } from "next";
import MainHeader from "../src/Layout/MainHeader";
import TopHeader from "../src/Layout/TopHeader";
import Paper from "../src/Components/Paper";

const Home: NextPage = () => {
  return (
    <div>
      <TopHeader />
      <MainHeader />
    </div>
  );
};

export default Home;

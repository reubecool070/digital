import React from "react";

const Layout = (props: any) => {
  const { children } = props;
  return <div style={{ margin: "15px 5%" }}>{children}</div>;
};

export default Layout;

import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Routers from "../../routers/Routers";

import AdminNav from "../../admin/AdminNav";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}
      <div>
        <Routers />
      </div>
      {location.pathname.startsWith("/dashboard") ? <></> : <Footer />}
    </>
  );
};

export default Layout;

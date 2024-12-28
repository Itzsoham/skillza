import React from "react";

import Footer from "@/components/Footer";
import NonDashboardNavbar from "@/components/navbar/NonDashboardNavbar";

import Landing from "./(nondashboard)/Landing/page";

const Home = () => {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar />
      <main className="nondashboard-layout__main">
        <Landing />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

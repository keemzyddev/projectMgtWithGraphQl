import React from "react";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Client from "../components/Client";
import Projects from "../components/Projects";
const Home = () => {
  return (
    <div>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Client />
    </div>
  );
};

export default Home;

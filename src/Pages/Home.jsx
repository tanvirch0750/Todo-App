import React from "react";
import TaskForm from "../components/TaskForm";

const Home = () => {
  return (
    <section className="py-24 lg:container lg:mx-auto px-5 lg:px-0">
      <h1 className="text-center text-4xl font-medium text-accent">
        What do you have planned?
      </h1>
      <TaskForm />
    </section>
  );
};

export default Home;

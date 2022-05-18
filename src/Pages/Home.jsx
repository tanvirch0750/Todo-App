import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import auth from "../Firebase.init";

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const {
    isLoading,
    error,
    data: tasks,
    refetch,
  } = useQuery("availableAppointment", () =>
    fetch(`http://localhost:5000/tasks?email=${user.email}`).then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <h1>Loading..</h1>;
  }
  console.log(tasks);
  return (
    <section className="py-24 lg:container lg:mx-auto px-5 lg:px-0">
      <h1 className="text-center text-4xl font-medium text-accent">
        What do you have planned?
      </h1>
      <TaskForm refetch={refetch} />
      <div className="">
        <h2 className="text-center text-4xl font-medium text-accent">Tasks</h2>
        <div class="overflow-x-auto mt-8">
          <table class="table w-full lg:max-w-5xl lg:mx-auto">
            <thead className="bg-accent">
              <tr className="bg-accent text-neutral">
                <th className="bg-accent text-bold">Name</th>
                <th className="bg-accent text-bold">Description</th>
                <th className="bg-accent text-bold">Completed</th>
                <th className="bg-accent text-bold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <Task key={task._id} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Home;

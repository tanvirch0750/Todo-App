import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import DeleteModal from "../components/DeleteModal";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import auth from "../Firebase.init";

const Home = () => {
  const [user] = useAuthState(auth);
  const [deleteModal, setDeleteModal] = useState(null);
  const {
    isLoading,
    error,
    data: tasks,
    refetch,
  } = useQuery("availableAppointment", () =>
    fetch(
      `https://protected-wave-67044.herokuapp.com/tasks?email=${user.email}`
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  return (
    <section className="py-24 lg:container lg:mx-auto px-5 lg:px-0">
      <h1 className="text-center text-4xl font-medium text-accent">
        What do you have planned?
      </h1>
      <TaskForm refetch={refetch} />
      <div className="">
        <h2 className="text-center text-4xl font-medium text-accent">Tasks</h2>
        <div className="overflow-x-auto mt-8">
          <table className="table w-full lg:max-w-5xl lg:mx-auto">
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
                <Task
                  key={task._id}
                  task={task}
                  setDeleteModal={setDeleteModal}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
          {deleteModal && (
            <DeleteModal
              deleteModal={deleteModal}
              refetch={refetch}
              setDeleteModal={setDeleteModal}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;

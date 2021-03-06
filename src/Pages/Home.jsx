import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import auth from "../Firebase.init";

const Home = () => {
  const [user] = useAuthState(auth);
  const [deleteModal, setDeleteModal] = useState(null);
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: tasks,
    refetch,
  } = useQuery("availableAppointment", () =>
    fetch(
      `https://protected-wave-67044.herokuapp.com/tasks?email=${user.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("accessToken");
        signOut(auth);
        navigate("/login");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="py-24 lg:container lg:mx-auto px-5 lg:px-0">
      <h1 className="text-center text-4xl font-medium text-accent">
        What do you have planned <br />
        {user?.displayName ? (
          <span className="text-secondary mt-1 text-2xl">
            {user.displayName}
          </span>
        ) : (
          ""
        )}
      </h1>
      <TaskForm refetch={refetch} />
      {tasks.length < 1 ? (
        <h2 className="text-center text-4xl font-medium text-accent">
          At the moment you have no task. Please add task.
        </h2>
      ) : (
        <div className="">
          <h2 className="text-center text-4xl font-medium text-accent">
            Tasks
          </h2>
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
      )}
    </section>
  );
};

export default Home;

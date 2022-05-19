import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../Firebase.init";

const TaskForm = ({ refetch }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});
  const onSubmit = async (data) => {
    const taskData = {
      name: data.name,
      description: data.description,
      email: user.email,
    };

    fetch("https://protected-wave-67044.herokuapp.com/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(taskData),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("accessToken");
          signOut(auth);
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => {
        reset();
        toast.success(`Task added successfully.`);
        refetch();
      });
  };
  return (
    <div className="py-16">
      <div className="card max-w-2xl bg-neutral shadow-lg mx-auto">
        <div className="card-body">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="font-medium">Task name:</label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Task name is required",
                  },
                })}
                type="text"
                placeholder="Your task"
                className="input w-full mt-1"
              />
              {errors.name?.type === "required" && (
                <span className="text-red-500 mt-2 block">
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div className="mt-4">
              <label className="font-medium">Task Description:</label>
              <input
                {...register("description", {
                  required: {
                    value: true,
                    message: "Discription is required",
                  },
                })}
                type="text"
                placeholder="Task description"
                className="input w-full mt-1"
              />
              {errors.name?.type === "required" && (
                <span className="text-red-500 mt-2 block">
                  {errors?.description?.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-accent input input-bordered w-full uppercase mt-4"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;

import React from "react";
import { toast } from "react-toastify";

const Task = ({ task, setDeleteModal, refetch }) => {
  const { _id, name, description } = task;

  const handleComplete = () => {
    fetch(`https://protected-wave-67044.herokuapp.com/tasks/${_id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success(`You successfully completed "${name}" task`);
        }
      });
  };

  return (
    <tr className="bg-neutral">
      <td
        className={`bg-neutral ${
          task.status === "completed" && "line-through text-accent"
        }`}
      >
        {name}
      </td>
      <td className="bg-neutral">{description}</td>
      <td className="bg-neutral">
        <button
          onClick={handleComplete}
          className="btn btn-sm bg-success text-gray-900 hover:text-white"
          disabled={task.status === "completed" ? true : false}
        >
          Completed
        </button>
      </td>
      <td className="bg-neutral">
        <label
          onClick={() => setDeleteModal(task)}
          htmlFor="delete-modal"
          className="btn btn-sm bg-error text-gray-900 hover:text-white"
        >
          Delete
        </label>
      </td>
    </tr>
  );
};

export default Task;

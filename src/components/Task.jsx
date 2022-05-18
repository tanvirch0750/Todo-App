import React from "react";

const Task = ({ task, setDeleteModal }) => {
  const { name, description } = task;

  return (
    <tr className="bg-neutral">
      <td className="bg-neutral">{name}</td>
      <td className="bg-neutral">{description}</td>
      <td className="bg-neutral">
        <button className="btn btn-sm bg-success text-gray-900 hover:text-white">
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
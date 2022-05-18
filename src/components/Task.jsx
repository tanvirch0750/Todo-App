import React, { useState } from "react";

const Task = ({ task, setDeleteModal }) => {
  const { name, description } = task;
  const [lineThrough, setLineThrough] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleComplete = () => {
    setLineThrough(true);
    alert(`Congratulations you completed "${name}" task`);
    setDisable(true);
  };

  return (
    <tr className="bg-neutral">
      <td className={`bg-neutral ${lineThrough && "line-through text-accent"}`}>
        {name}
      </td>
      <td className="bg-neutral">{description}</td>
      <td className="bg-neutral">
        <button
          onClick={handleComplete}
          className="btn btn-sm bg-success text-gray-900 hover:text-white"
          disabled={disable}
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

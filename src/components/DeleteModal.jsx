import React from "react";
import { toast } from "react-toastify";

const DeleteModal = ({ deleteModal, refetch, setDeleteModal }) => {
  const { _id, name } = deleteModal;

  const handleDelete = (id) => {
    fetch(`https://protected-wave-67044.herokuapp.com/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setDeleteModal(null);
        toast.error(`Task deleted`);
        refetch();
      });
  };

  return (
    <div>
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="delete-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 bg-accent"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-red-500">
            Are you sure you want to delete task: "{name}"?
          </h3>
          <div className="modal-action">
            <button
              onClick={() => handleDelete(_id)}
              className="btn btn-error btn-md text-white"
            >
              delete
            </button>
            <label htmlFor="delete-modal" className="btn btn-md btn-accent">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

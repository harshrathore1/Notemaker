import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createTodoApi } from "../services/api";

function AddTodoModal({ setRefreshList }) {
  const [todoDesc, setTodoDesc] = useState("");

  const handleTodoSubmit = async () => {
    console.log(todoDesc, "TodoDesc");

    if (todoDesc === "") {
      toast("Todo is required");
      return;
    }

    const result = await createTodoApi({ desc: todoDesc });
    console.log(result);
    if (result.status === 200 && result.data.status === 200) {
      toast("Todo Added");
      setRefreshList(new Date()); // Refresh the todo list after adding a new todo
      setTodoDesc(""); // Reset the todo description input field
    } else {
      toast(result.data.message);
    }
  };

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1">
      <ToastContainer />
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: "10px" }}>
          <div className="modal-header" style={{ borderBottom: "none" }}>
            <h5 className="modal-title text-center fw-bold">Add new Todo</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <textarea
                name=""
                className="form-control w-100"
                rows={3}
                onChange={(e) => {
                  setTodoDesc(e.target.value);
                }}
                placeholder="Write Todos..."
                style={{ borderRadius: "10px" }}
                value={todoDesc} // Added value attribute to bind the todoDesc state to the input field
              ></textarea>
            </div>
          </div>
          <div className="modal-footer" style={{ borderTop: "none" }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setTodoDesc("");
              }}
              data-bs-dismiss="modal"
              style={{
                borderRadius: "10px",
                padding: "10px 40px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.24)",
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleTodoSubmit}
              style={{
                borderRadius: "10px",
                padding: "10px 40px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.24)",
              }}
            >
              Save Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodoModal;

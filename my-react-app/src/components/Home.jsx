import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Todo from "./Todo";
import AddTodoModal from "./AddTodoModal";
import { getTodoListApi, getToken } from "../services/api";
import "./Home.css"; // Import the CSS file

function Home() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState(false); // Added refreshList state

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
    fetchTodoList();
  }, [refreshList]); // Added refreshList dependency

  async function fetchTodoList() {
    const result = await getTodoListApi();
    console.log("todolist", result);
    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos.reverse());
    }
  }

  return (
    <div className="home-container"> {/* Added the home-container class */}
      <Header />
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {list.map((todo) => (
            <Todo todo={todo} key={todo._id} />
          ))}
        </div>
      </div>
      <div
        className=" "
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-primary"
          style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.24)" }}
        >
          <i className="bi bi-plus-lg me-2"></i>Add
        </button>
      </div>
      <AddTodoModal setRefreshList={setRefreshList} /> {/* Passed setRefreshList prop */}
    </div>
  );
}

export default Home;






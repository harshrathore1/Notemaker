import React from "react";
import moment from "moment";
function Todo({ todo }) {
  return (
    <div className="col-sm-3 mx-3 my-2 alert bg-light">
      <div className="card-header">
        {todo.iscompleted ? 'Completed' : 'Completed'}
      </div>
      <div className="card-body">
        <h4 className="card-title">{todo.desc}</h4> {/* Removed single quotes around todo.desc */}
        <p className="card-text">{moment(todo.date).fromNow()} </p>
      </div>
    </div>
  );
}

export default Todo;

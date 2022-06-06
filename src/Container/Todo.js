import React, { useState } from "react";
// import {toast} from 'react-toastify';

import List from "../Utils/List";
import Alert from "../Utils/Alert";   



const Todo = () => {
 
const [name,setName]=useState("")
  const [list, setList] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    let whiteSpaceRegex = /^\s*$/;
    if (!name || name.match(whiteSpaceRegex)) { 
      showAlert(true, "danger", "Please Enter value"); 
      // toast("plzz enter value") 
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setEditing(false);
      showAlert(true, "success", "value changes");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setEditing(true);
    setEditId(id);
    setName(editItem.title);
  };
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };
  return (
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3
          style={{ marginBottom: "1.5rem", textAlign: "center" }}
          className="text"
        >
          Todo List
        </h3>
        <div className="mb-3 form">
          <input
            type="text"
            className="form-control"
            placeholder="add item"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button type="submit" className="btn btn-success">
            {isEditing ? "Edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <div className="text-center">
            <button className="btn btn-warning" onClick={clearList}>
              Clear items
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Todo;

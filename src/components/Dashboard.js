import React, { useState } from "react";
import { Card, Button, Alert, Navbar, Container,Image } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import Notes from "./Notes";

import './App.css';

function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const handleSubmitNote = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("notes")
      .add({
        title: title,
        description: description,
        name: name,
      })
      .then(() => {
        alert("Note has been submited successfully!");
        setLoader(false);
      })
      .catch((error) => {
        alert(error.note);

        setLoader(false);
      });
    setTitle("");
    setDescription("");
    setName("");
  };

  return (
    <>
      <div className="w-100  mt-2">
        <Navbar>
          <Navbar.Brand href="#home">
          <Image
           className="rounded mx-auto d-block" 
           alt="aligment"
           width={64}
           height={64}
           src="https://i.imgur.com/ZGBsuGK.png" rounded />Crop Notes</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as:<strong>{currentUser.email}</strong>
             
            </Navbar.Text>
            <Navbar.Text>
            <Button className="ml-3" variant="danger" onClick={handleLogout}>
          Log out
        </Button>

            </Navbar.Text>
         
          </Navbar.Collapse>
          
        </Navbar>
      </div>

      <Card>
        <Card.Body>
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "30vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              {error && <Alert variant="danger">{error}</Alert>}
              <section className="noteform justify-content-center align-itens-center">
                <h3>Create Crop Note</h3>

                <div className="form-group">
                <label htmlFor="defaultFormNameModalEx">Name</label>
                  <input
                    type="text"
                    id="defaultForm"
                    className="form-control form-control-sm"
                    name="noteform-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="noteform-title">Title</label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    id="noteform-title"
                    name="noteform-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label htmlFor="noteform-note">Description</label>

                  <textarea
                    className="md-textarea form-control"
                    name="noteform-note"
                    id="noteform-note"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <button
                  style={{ background: loader && "#ccc" }}
                  className="btn btn-success"
                  onClick={handleSubmitNote}
                >
                  Create Note
                </button>
              </section>
            </div>
          </Container>
        </Card.Body>
        <Card style={{ width: "18rem" }}></Card>
      </Card>
      
      <ul>
        <li>
          <Notes />
        </li>
      </ul>
    </>
  );
}

export default Dashboard;

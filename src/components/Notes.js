import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { db } from '../firebase';
import './Dashboard.css';
const Notes = () => {
  const [noteList, setNoteList] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    const unsuscribe =
      db.collection('notes').onSnapshot((snapshot) => {
          const noteList = snapshot.docs.map((doc) => ({
           name: doc.data().name,
           title: doc.data().title,
           description: doc.data().description
          }));
          setNoteList(noteList);
          console.log('notelist', noteList);
      }, () => {
        setError(true)
      });
      setLoading(false);
      return() => unsuscribe();
  }, [])
 

  return (
    <>
   
      <ul>
        {noteList.map(noteList => (<li> 
          <Card className="form-group">
            <Card.Body>
              <Card.Title>{noteList.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
               {noteList.name}
              </Card.Subtitle>
              <Card.Text>
              {noteList.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </li>))}
      </ul>
    
    </>
  );
}

export default Notes;

import { useState, useEffect } from "react";
import axios from 'axios';


function App() {

  const [notes, setNotes] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, [])

  const fetchNotes = async () => {
    // Fetch the notes
    const res = await axios.get("http://localhost:3000/notes");
    // Set it on state
    setNotes(res.data.notes);
  }

  return (
    <div className="App">
      <div class="displaynote">
        <h2>Notes:</h2>
        {notes && notes.map((note) => {
          return (
            <div key={note._id}>
              <h3>{note.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import Header from "./Header";

function App() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getWord(search);
    }
  }

  const getWord = (word) => {
    
    setErr(false);
    setLoading(true);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => {
        setErr(true);
      })
      .finally(() => setLoading(false));

  };

  useEffect(() => {
    getWord("hello");
  }, [])

  
  return (
    <div className="App">
      <Header />

      <div className="search-container">
        <input 
          className="search"
          type="search" 
          value={ search }
          onChange={ (e) => setSearch(e.target.value) }
          onKeyDown={handleKeyPress}
          placeholder="Start typing any word..."
        />
      </div>

      <div className="word-container">

        <div></div>

        { (!loading && data.length > 0) && (
          <div className="word">
            <p className="dict-word">{ data[0].word }</p>
            <p className="phonetic">{ data[0].phonetics[0].text ? data[0].phonetics[0].text : data[0].phonetics[1].text }</p>
            { data[0].meanings.map((meaning) => (
              <>
                <p className="part-of-speech">{ meaning.partOfSpeech }</p>
                <ol>
                  {
                    meaning.definitions.map((def) => (
                      <>
                        <li>{ def.definition }</li>
                      </>
                    ))                    
                  }
                </ol>
                <br></br>
                <hr />
              </>
            ))}
          </div>
        )} 

        { 
          loading && (
            <p>Loading...</p>
          )
        }

        {
          !loading && !(data.length > 0) && (
            <p>Word not found.</p>
          )
        }

        <div></div>
      </div>
    </div>
  );
}

export default App;

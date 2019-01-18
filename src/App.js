import React, { Component } from 'react';
import Note from './components/Note'
import './App.css';
import PokemonContainer from './containers/PokemonContainer'
const URL = 'https://pokeapi.co/api/v2/pokemon'



class App extends Component {

    state = {
      noteText: '',
      images: '',
      notes: [],
      pokemon: []
    }

    componentDidMount() {
      this.fetchGame()
    }

  fetchGame= () => {
    fetch(URL)
    .then(resp => resp.json())
    .then(result => this.setState({
        pokemon: result.results
      })
    )
  }

    updateNoteText(noteText) {
      this.setState({
        noteText: noteText.target.value
      })
    }

    addNote() {
      if (this.state.noteText === '') {return}

      const notesArr = [...this.state.notes, this.state.noteText]

      this.setState({
        noteText: '',
        notes: notesArr
      })

      this.textInput.focus()
    }

    handleKeyPress = (event) => {
      if(event.key === 'Enter') {
          // let notesArr = this.state.notes
          // notesArr.push(this.state.noteText)
          const notesArr = [...this.state.notes, this.state.noteText]

          this.setState({
            noteText: '',
            notes: notesArr
          })
      }
    }

    deleteNote(index) {
      let notesArr = this.state.notes
      notesArr.splice(index, 1)
      this.setState({ notes: notesArr })
    }

  render() {

    let notes = this.state.notes.map((val, key) => {
      return <Note key={key} text={val}
              deleteMethod ={() => this.deleteNote(key) } />
    })

    return (
      <div className="container">
        <div className="header">PokeSwap</div>
        {notes}

        <PokemonContainer allPokemon={this.state.pokemon} />

        <div className="btn" onClick={this.addNote}><img src='./pokeball.png' width='30px' /></div>

        <input type="text"
          ref={((input) => {this.textInput = input})}
          className="textInput"
          value={this.state.noteText}
          onChange={noteText => this.updateNoteText(noteText)}
          onKeyPress={this.handleKeyPress}
          />

      </div>
    );
  }
}

export default App;

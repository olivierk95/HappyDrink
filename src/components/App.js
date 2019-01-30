import React, { Component } from 'react';
import { establishments } from './establishments/fixtures';
import Establishment from './establishments/Establishment';
import logo from '../assets/logo.svg';
import '../css/App.css';

class App extends Component {
  
  constructor(props) {
      // Ne pas oublier d'appeler le constructeur père ! (Obligatoire)
      super(props);
      // On définit le state de notre component que l'on hérite de la classe "Component"
      // Cela remplace la fonction "getInitialState"
      this.state = {
          pseudo  : "Olivier",
          searchStringUser: "",
      }
  }

  // On définit la fonction appelée lors d'un clic sur le lien "Changer le pseudo !"
  // la syntaxe  " nomFonction = () => {} " nous permet de conserver le contexte `this` du scope courant. (Ici, la classe App)
  randomPseudo = () => {
      // On s'amuse un peu ;)
      let randomPseudo    = ""
      const possible      = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      const size          = Math.floor(Math.random() * 10) + 5
      for( let i=0; i < size; i++ ){
          randomPseudo += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      // On met à jour le state via la fonction "setState" héritée de la classe Component
      this.setState({
          pseudo : randomPseudo
      })
  } 
  
  handleChange(e){
    this.setState({searchStringUser: e.target.value});
  }
  
  render() {
    

    const establishmentFilter = establishments.filter((searchText) => {
        let search = searchText.name + " " + searchText.description;
        return search.toLowerCase().match(this.state.searchStringUser);
    });

    const listEstablishment = establishmentFilter.map( (establishment) => {
      return (
       <Establishment key={ establishment.id } establishment={ establishment }/> // on n'a pas oublié la props "establishment" :)
      )
    });



    return (
      <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome { this.state.pseudo } to { this.props.title }</h2>
          </header>
          <div className="App-intro">
              {/* On appelle notre fonction lors du clic sur le lien */}
              <p> 
                  <a onClick={ this.randomPseudo } >Changer le pseudo { this.state.pseudo } !</a> 
              </p>
              <div>
                  {/* // l'input contient deux attribut spéciaux :
                  // - value (vous avez compris ce que ça vaut maintenant)
                  // - onChange ( fonction qui va être lancée à chaque changement de l'input. Cette fonction en appel un autre qui recupère donc la value et la modifie dans le state) */}
                  <input
                      type="text"
                      placeholder="search"
                      value={this.state.searchStringUser}
                      onChange={this.handleChange.bind(this)}
                  />
              </div>
              <section>
                  { listEstablishment }
              </section>
          </div>
      </div>
    );
  };
}

export default App;

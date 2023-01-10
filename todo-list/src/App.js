import './App.css';
import React from 'react';
import Form from './Componentes/Form';
import Footer from './Componentes/Footer';

class App extends React.Component {
  render() {
    return(
      <main>
        <Form />
        <Footer />
      </main>
    );
  }
}

export default App;

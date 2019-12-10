import React from 'react';
import './App.css';
import SearchWidget from './components/SearchWidget';
import SearchResultWidget from './components/SearchResultWidget';

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      filters: {}
    }
  }
  getFilters = (filters) => {
    this.setState(() => ({filters: filters}))
  }
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark">
          <p className="navbar-brand">Flight Search Engine</p>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-3">
              <SearchWidget filters={this.getFilters} />
            </div>
            <div className="col-12 col-md-9">
              <SearchResultWidget filters = {this.state.filters} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

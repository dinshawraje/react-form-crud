import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link,RouteComponentProps } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import {Home} from './containers/home';
import {TopBar} from './containers/top-bar';
import CreateEmp from './containers/create-emp';
import EmpList from './containers/emp-list'
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import EmpShow from './containers/emp-show';
import EditEmp from './containers/edit-emp';

function App() {
  return (
    <div className="App">
      <Router>
        <TopBar/>
          
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/create-emp" component={CreateEmp} />
              <Route exact path="/emp-lists" component={EmpList} />
              <Route exact path="/emp/:id" render={(props) => <EmpShow {...props}/> }  />
              <Route exact path="/emp-edit/:id" render={(props) => <EditEmp {...props}/> }  />

            </Switch>
      </Router>       
    </div>
  );
}

export default App;

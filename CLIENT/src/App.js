import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse,
  } from "mdbreact";

import {MDBContainer } from "mdbreact";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import listEmployee from './employee/list'
import Add from './employee/add';

class App extends React.Component {

  state = {
    isOpen: false
  };
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  

  render() {
    
    return (
      <Router>
        <Fragment>
          <MDBNavbar color="indigo" dark expand="md" className="mb-4">
            <MDBContainer>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavbarBrand >
                <strong className="white-text ml-2">Master Data</strong>
              </MDBNavbarBrand> 
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        </Fragment>
        
        {/* <Route path="/purchase-order/create" exact component={Order}/> */}
        <Route path="/" exact component={listEmployee}/>
        <Route path="/create" exact component={Add}/>
        <Route path="/update/:id" exact component={Add}/>

      </Router> 
    );
  }
}

// Exporting the component
export default App;
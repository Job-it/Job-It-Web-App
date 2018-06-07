import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import Axios from 'axios';

class OpportunityNavBar extends React.Component {
  
  constructor(props) {
    super(props);
  }

  handleLogout() {
    Axios.get('/logout');
  }

  render() {
    return (
      <Navbar >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">Job.it</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onClick={this.props.toggleArchived}>
            <Button bsStyle="info">{this.props.isArchived ? "Hide Archived" : "Show Archived"}</Button>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={2} href="#"></NavItem>
            <NavItem eventKey={3} href="#">
            <Button bsStyle="danger" onClick = {this.handleLogout}>Logout</Button>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default OpportunityNavBar;
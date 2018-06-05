import React from 'react';
import moment from 'moment';

class OpportunityCard extends React.Component {
  constructor(props) {
    //console.log(props);
    super(props);
    this.state = {
      showMenu: false,
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu() {
    this.setState({ showMenu: true });
    document.addEventListener('click', this.closeMenu);
  }
  closeMenu() {
    this.setState({ showMenu: false });
    document.removeEventListener('click', this.closeMenu);
  }

  render() {
    return (
      <div 
        id='yes-drop'
        className={'opportunity-card ' + (this.props.opportunity.isArchived ? 'archived' : 'draggable-opportunity drag-drop')}
        data-id = {this.props.opportunity._id}>
        <div><button className='opportunity-card-menu-button' onClick={() => this.showMenu()}><span>☰</span></button></div>
        <div className='opportunity-card-menu-wrapper'>
          {
            this.state.showMenu
              ? (
                <div className='opportunity-card-menu'>
                  <div><button onClick={() => this.props.selectOpportunity(this.props.opportunity._id, this.props.opportunity.oppName, this.props.opportunity.orgName) }>Explore</button></div>
                  <div><button onClick = {() => {this.props.update(this.props.opportunity._id)}}> Update </button></div>
                  <div><button onClick = {() => {this.props.archiveOpportunity(this.props.opportunity._id, this.props.opportunity.isArchived)}}>{ this.props.opportunity.isArchived ? 'Unarchive' : 'Archive' }</button></div>
                  <div><button onClick = {() => {this.props.deleteOpp(this.props.opportunity._id)}}> Delete </button></div>
                </div>
              )
              : (
                null
              )
            }
        </div>
        <div className='opportunity-content-main'>
        <div className="opp-info"><h3>{this.props.opportunity.oppName}</h3></div>
        <div className="opp-info"><h3>{this.props.opportunity.orgName}</h3></div>
        <div className="opp-info">Created {moment(this.props.opportunity.dateOpened).fromNow()}</div>
        <div className="opp-info">Due {moment(this.props.opportunity.dateClosed).fromNow()}</div>
        <div className="opp-info">{this.props.opportunity.type}</div>
        </div>
      </div>
    )
  } 
} 

export default OpportunityCard;

import React, { Component, Fragment } from "react"
import {Button, Card, Accordion, Col, Container, Row} from "react-bootstrap"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEntries } from './actions/entryActions';
import EntryModal from './EntryModal'
import './entries.css'
import DeleteButton from './DeleteButton'
import FavoriteButton from './FavoriteButton'

//Functionalities:
/*
1. Sort by Date (ascend or descend), Favorite
2. Search Entry by Word
3.
*/


class Entries extends Component {

constructor(props) {
  super(props)
  this.state = {
    id: "",
    delete: false,
    favorite: false,
    delete_size: 1,
    favorite_size: 1
    
  }
  if (this.props.auth.isAuthenticated && !this.props.auth.isLoading) {
      this.setState({id: this.props.auth.user._id})
      this.props.getEntries(this.props.auth.user._id)
  }

    
}

toggleFavorite = () => {
  this.setState(prevState => ({
    favorite: !prevState.favorite,
    favorite_size: prevState.favorite_size ^ 1
  }))
  
}

toggleDelete = () => {
  this.setState(prevState => ({
    delete: !prevState.delete,
    delete_size: prevState.delete_size ^ 1
  }))
  
}

  componentDidUpdate(prevProp) {
    if (this.props.auth.isAuthenticated && this.props.auth.user !== prevProp.auth.user) {
      
      this.props.getEntries(this.props.auth.user._id)
      this.setState({id: this.props.auth.user._id})
    }
  }
static propTypes = {
  getEntries: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired
  };


  render() {
    const {isAuthenticated} = this.props.auth;
    const vals = this.props.entry.entries 
    var user_id = this.state.id;
    var colsize = 10 + this.state.delete_size + this.state.favorite_size
    var deleteState = this.state.delete
    var favoriteState = this.state.favorite
    if (this.props.auth.user) {
      user_id = this.props.auth.user._id
    }
   
    const loggedIn = (
      <div className="entries">
        
        <Container>
          <Row>
        <EntryModal user_id={user_id} buttonLabel="Add Entry" />
        <Button variant="danger" onClick={this.toggleDelete}> Delete Entry </Button>
        <Button variant="warning" onClick={this.toggleFavorite}> Favorite </Button>
        </Row>
        {vals.map( (obj, i) => 
        <Fragment>
          <Accordion key={i} >
        <Card>
        <Row>
        <DeleteButton isDelete={deleteState} userID={user_id} objID={obj._id}/>
        <FavoriteButton isFavorite={favoriteState} userID={user_id} objID={obj._id}/>
        <Col md={colsize}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {obj.title}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
            {obj.content}
            <br/>
            <br/>
            { "Date: " + obj.date.slice(0,10) }
            </Card.Body>
          </Accordion.Collapse>
      </Col>
      </Row>  
      </Card>
      </Accordion>
      
      </Fragment>
      )}
      </Container>
        </div>
    )

  const welcome = (
    <Fragment>
      <div className="Home">
    <h3>myJournal</h3>
          <div className="divStyle">
  <p> nice little application to keep journal entries </p>
  </div>
  </div>
  </Fragment>
  
  )

    return(
      <div>
  {isAuthenticated? loggedIn: welcome}
  </div>
    )
    
  }
}

const mapStatetoProps = state => ({
  entry: state.entry,
  auth: state.auth
})

export default connect(mapStatetoProps, {getEntries})(Entries);
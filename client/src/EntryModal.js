import React, { Component } from 'react';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Col } from 'reactstrap';
import { addEntries } from './actions/entryActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class EntryModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      setModal: false,
      buttonLabel: props.buttonLabel,
      id: props.user_id
    }
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    addEntries: PropTypes.func.isRequired
  }
  
  onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const newEntry = {
      date: Date(),
      title: this.state.title,
      content: this.state.content,
      favorite: 0
    }

    this.props.addEntries(this.state.id, newEntry);
    this.toggle();
  }

  render() {
    return (
        <div>
          <Button color="primary" onClick={this.toggle}>{this.state.buttonLabel}</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>New Journal Entry</ModalHeader>
            <ModalBody>
            <Form >
                  <FormGroup>
                    <Label style={{color: "black"}} for='entryTitle'>Journal Title</Label>
                    <Col xs="9">
                    <Input
                      type='text'
                      name='title'
                      id='entryTitle'
                      onChange={this.onChange}
                    />
                    </Col>
                    </FormGroup>
                    <FormGroup>
                    <Label style={{color: "black"}} for='entryContent'>Content</Label>
                    <Col xs="9">
                    <Input
                      type='textarea'
                      name='content'
                      id='entryContent'
                      onChange={this.onChange}
                    />
                    </Col>
                  </FormGroup>
                  </Form>
                  <Button color="primary" onClick={this.onSubmit}>Add Entry</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalBody>
            <ModalFooter>

            </ModalFooter>
          </Modal>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  entry: state.entry,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addEntries}) (EntryModal);
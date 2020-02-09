import React, { Component, Fragment } from 'react';
import { deleteEntries } from './actions/entryActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {Button, Col} from "react-bootstrap"


class DeleteButton extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        deleteEntries: PropTypes.func.isRequired
      }


    onDeleteClick = (user_id, entry_id) => {
        const newEntry = {
          entryID: entry_id
        }
        this.props.deleteEntries(user_id, newEntry);
      }
      render() {
        const bool = this.props.isDelete
        const userID = this.props.userID
        const objID = this.props.objID
        const temp = (_id, oid) => this.onDeleteClick.bind(this, _id, oid);

        const DeleteButton = (
            <Col md={1}>
                <Button variant="danger" size="lg" onClick={temp(userID, objID)}>X</Button>
            </Col> 
        )

        return (
            <Fragment>
                {bool? DeleteButton:null}
            </Fragment>
            )
      }
    
}

const mapStateToProps = state => ({
    entry: state.entry,
    isAuthenticated: state.auth.isAuthenticated
  })

export default connect(mapStateToProps, {deleteEntries}) (DeleteButton)
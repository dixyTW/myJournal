import React, { Component, Fragment } from 'react';
import { updateFavorites } from './actions/entryActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Col} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


class FavoriteButton extends Component {

    constructor(props) {
        super(props)
        this.toggleColor = this.toggleColor.bind(this);

    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        updateFavorites: PropTypes.func.isRequired
      }

    
    toggleColor = (userID, entryID) => {
        const entry = {
            userID: userID,
            entryID: entryID
        }
        this.props.updateFavorites(entry)
    }

    render() {
        

        const bool = this.props.isFavorite
        const userID = this.props.userID
        const entryID = this.props.objID
        const colorArr = ["gray", "#FFCC00"]
        const colorIndex = this.props.entryFavorite
        const temp = (_id, oid) => this.toggleColor.bind(this, _id, oid);
          

        const FavoriteButton = (color) => (
            <Col md={1}>
                <div  className="button" style={{ color: color, position: "absolute", left: "60%", top: "25%"}}>
                <FontAwesomeIcon id={"testID"} onClick={temp(userID, entryID)} icon={faStar}/>
                </div>
            </Col> 
        )

        return (
            <Fragment>
                {bool? FavoriteButton(colorArr[colorIndex]):null}
            </Fragment>
            )
      }
}

const mapStateToProps = state => ({
    entry: state.entry,
    isAuthenticated: state.auth.isAuthenticated
  })

export default connect(mapStateToProps, {updateFavorites})(FavoriteButton);

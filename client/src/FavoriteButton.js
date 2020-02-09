import React, { Component, Fragment } from 'react';
import { favoriteEntries } from './actions/entryActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {Button, Col} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


class FavoriteButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            color: 0 //replace with this.props.favorite
        }
        this.toggleColor = this.toggleColor.bind(this);

    }

    
    toggleColor = () => {
        this.setState(prevState => ({
            color: prevState.color ^ 1
          }))
    }

    render() {
        

        const bool = this.props.isFavorite
        const userID = this.props.userID
        const objID = this.props.objID
        const colorArr = ["gray", "#FFCC00"]
        const colorIndex = this.state.color;
        console.log(colorIndex)
        
          

        const FavoriteButton = (color) => (
            <Col md={1}>
                <div  className="button" style={{ color: color, position: "absolute", left: "60%", top: "25%"}}>
                <FontAwesomeIcon id={"testID"} onClick={this.toggleColor} icon={faStar}/>
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

export default FavoriteButton;

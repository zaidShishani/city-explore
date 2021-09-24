import React from 'react';
import Card from 'react-bootstrap/Card';



class MovieInfo extends React.Component {
    render () {
        return (
            <>
            <Card>
                <Card.Img style ={{width:'18em'} }src={this.props.imgURL}/>
                <Card.Body>
                    <Card.Title>Title: {this.props.title}</Card.Title>
                    <Card.Text>Overview: {this.props.overview}</Card.Text>
                    <Card.Text>Average Votes: {this.props.avgVotes}</Card.Text>
                    <Card.Text>Total Votes: {this.props.totalVotes}</Card.Text>
                    <Card.Text>Popularity: {this.props.popularity}</Card.Text>
                    <Card.Text>Released : {this.props.released}</Card.Text>
                </Card.Body>
            </Card>
            </>
        )
    }
}

export default MovieInfo;
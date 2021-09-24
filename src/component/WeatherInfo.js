import React from 'react';
import Card from 'react-bootstrap/Card';


class WeatherInfo extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <Card.Header>Weather in {this.props.city}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Description: {this.props.description}
                            <br></br>
                            Date: {this.props.date}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default WeatherInfo;
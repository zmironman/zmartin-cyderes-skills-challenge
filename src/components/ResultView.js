import {Button, Card} from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom'

const ipRegex = RegExp(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

export default class ResultView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className='mb-lg-3 mt-lg-3'>
                <Card.Header as='h5'>{this.props.reportType}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {JSON.stringify(this.props.reportBody, null, 4)}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
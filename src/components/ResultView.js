import {Card} from 'react-bootstrap';
import React from 'react';
export default class ResultView extends React.Component {
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
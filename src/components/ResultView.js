import {Row, Col, Card, Button} from 'react-bootstrap';
import React from 'react';

export default class ResultView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reportType: this.props.reportType,
            fullReport: JSON.stringify(this.props.reportBody, null, 4),
            reportBody: this.props.reportBody,
            showFullReport: false
        }
    }

    handleShowReportClick = () => {
        this.setState({showFullReport: !this.state.showFullReport});
    };


    render() {
        return (
            <Row className='justify-content-center'>
                <Col md={10} lg={8} xs s={12}>
                    <Card className='mb-3 mt-3'>
                        <Card.Header as='h5'>{this.state.reportType}</Card.Header>
                        <Card.Body>
                            <Row className='justify-content-center'>
                                <Col>
                                    <Card.Text>
                                        {/*TODO: build the report body based on report type in a separate function*/}
                                        {this.state.reportBody.toString()}
                                    </Card.Text>
                                </Col>
                            </Row>
                            {this.state.showFullReport &&
                            <Row className='justify-content-end mt-4 mr-1'>
                                <Button variant='outline-secondary' onClick={this.handleShowReportClick}>Hide Full
                                    Report</Button>
                            </Row>}
                            <Row className='justify-content-start mt-3'>
                                <Col>
                                    {this.state.showFullReport &&
                                    <Card.Text>
                                        {this.state.fullReport}
                                    </Card.Text>
                                    }
                                </Col>
                            </Row>
                            <Row className='justify-content-end mt-4 mr-1'>
                                {!this.state.showFullReport &&
                                <Button variant='outline-danger' onClick={this.handleShowReportClick}>Show Full
                                    Report</Button>}
                                {this.state.showFullReport &&
                                <Button variant='outline-secondary' onClick={this.handleShowReportClick}>Hide Full
                                    Report</Button>}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}
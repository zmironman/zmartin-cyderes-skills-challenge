import {Row, Col, Card, Button} from 'react-bootstrap';
import React from 'react';
import ReportBody from "./ReportBody";

export default class ResultView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            reportType: this.props.reportType,
            fullReport: JSON.stringify(this.props.reportBody, null, 4),
            reportTitle: '',
            showFullReport: false
        };
    }

    handleShowReportClick = () => {
        this.setState({showFullReport: !this.state.showFullReport});
    };

    handleSetup = () => {
        if (this.props.reportType === 'Whois') {
            this.setState({reportTitle: 'Who Is'});
        } else if (this.props.reportType === 'Geodata') {
            this.setState({reportTitle: 'Geo Data'});
        } else if (this.props.reportType === 'Virus Total') {
            this.setState({reportTitle: 'Virus Total'});
        }
    };

    render() {
        this.handleSetup();
        return (
            <Row className='justify-content-center'>
                <Col md={10} lg={8} xs s={12}>
                    <Card className='mb-3 mt-3'>
                        <Card.Header as='h4'>{this.state.reportTitle}</Card.Header>
                        <Card.Body>
                            <Row className='justify-content-center'>
                                <ReportBody fullReport={this.props.reportBody} reportType={this.props.reportType}/>
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
import {Button, Container, Form, Row, Col, Tooltip, OverlayTrigger} from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from "react-bootstrap/Spinner";
import axios from 'axios';
import ResultView from "../components/ResultView";

const ipRegex = RegExp(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        This can be a large report and may take some time.
    </Tooltip>
);

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ip: '',
            whois: false,
            geodata: false,
            virustotal: false,
            validIp: false,
            loading: false,
            showResults: false,
            reports: []
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({loading: true, showResults: false});

        if (!this.state.validIp) {
            console.error('Invalid IP');
            alert('The IP submitted is invalid.  Please ensure you are submitting a valid IPv4 address.');
            this.setState({loading: false});
        } else if (!this.state.whois && !this.state.geodata && !this.state.virustotal) {
            console.error('Invalid information selection');
            alert('Please select the information you would like to see.');
            this.setState({loading: false});
        } else {
            await axios
                .get(`https://blny8i77fj.execute-api.us-east-2.amazonaws.com/Dev/?ip=${this.state.ip}&geodata=${this.state.geodata}&virustotal=${this.state.virustotal}&whois=${this.state.whois}`)
                .then(response => {
                        this.setState({reports: response.data, showResults: true});
                        ReactDOM.render(this.buildReports(this.state.reports), document.getElementById('report-view'));
                    }
                ).catch(
                    err => {
                        console.error(JSON.stringify(err, null, 4))
                    }
                );
            this.setState({loading: false})
        }
    };

    handleTextboxChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({ip: value});
        if (name === 'ip') {
            if (ipRegex.test(value)) {
                this.setState({validIp: true})
            }
        }
    };

    handleCheckboxChange = e => {
        const {name, checked} = e.target;
        this.setState({[name]: [checked][0]});
    };

    buildReports = reports => {
        if (reports !== undefined) {
            return (
                reports.map((rep, index) => <ResultView reportType={rep[0]} reportBody={rep[1]} key={index}/>)
            )
        }
    };


    render() {
        return (
            <Container fluid>
                <Form onSubmit={this.handleSubmit} className='mb-3'>
                    <Form.Group>
                        <Row className="justify-content-center">
                            <Col>
                                <Form.Label>Please enter a valid IPv4 IP</Form.Label>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={6} lg={4} s={8} xs={10}>
                                <Form.Control type='input' placeholder='0.0.0.0' name='ip' noValidate
                                              onChange={this.handleTextboxChange}/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row className="justify-content-center">
                            <Col>
                                <Form.Label>Please select the information you would like to see</Form.Label>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col xs={5} s={4} md={3} lg={2}>
                                <Form.Check label='WhoIs' name='whois' inline onChange={this.handleCheckboxChange}/>
                            </Col>
                            <Col xs={5} s={4} md={3} lg={2}>
                                <Form.Check label='Geo Data' name='geodata' inline
                                            onChange={this.handleCheckboxChange}/>
                            </Col>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{show: 100, hide: 500}}
                                overlay={renderTooltip}
                            >
                                <Col xs={5} s={4} md={3} lg={2}>
                                    <Form.Check label={'Virus Total'} name='virustotal' inline
                                                onChange={this.handleCheckboxChange}/>
                                </Col>
                            </OverlayTrigger>
                        </Row>
                    </Form.Group>
                    <Row className="justify-content-center">
                        <Col>
                            {!this.state.loading &&
                            <Button variant='outline-primary' type='submit' onClick={this.handleSubmit}>Submit</Button>}
                            {this.state.loading &&
                            <Button variant='outline-primary' type='submit' disabled><Spinner animation="border"
                                                                                              variant="secondary"
                                                                                              size='sm'/> Loading...</Button>}
                        </Col>
                    </Row>
                </Form>
                {this.state.showResults && <div id='report-view'/>}
            </Container>
        )
    }
}
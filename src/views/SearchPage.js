import {Button, Container, Form} from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from "react-bootstrap/Spinner";
import axios from 'axios';
import ResultView from "../components/ResultView";

const ipRegex = RegExp(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

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
        this.setState({loading: true, showResult: false});

        if (!this.state.validIp) {
            console.error('Invalid IP');
            alert('The IP submitted is invalid.  Please ensure you are submitting a valid IPv4 address.')
            this.setState({loading: false});
        } else if (!this.state.whois && !this.state.geodata && !this.state.virustotal) {
            console.error('Invalid information selection');
            alert('Please select the information you would like to see.');
            this.setState({loading: false});
        } else {
            console.log(`Submitted IP: ${this.state.ip}`);
            const res = await axios
                .get(`https://blny8i77fj.execute-api.us-east-2.amazonaws.com/Dev/?ip=${this.state.ip}&geodata=${this.state.geodata}&virustotal=${this.state.virustotal}&whois=${this.state.whois}`)
                .then(response => {
                        console.log(JSON.stringify(response.data, null, 4));
                        this.setState({reports: response.data, showResults: true});
                        ReactDOM.render(this.buildReports(response.data), document.getElementById('report-view'));
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
        console.log(e.target);
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
                <Form onSubmit={this.handleSubmit} className='mb-lg-3'>
                    <Form.Group>
                        <Form.Label>Please enter a valid IPv4 IP</Form.Label>
                        <Form.Control type='input' placeholder='0.0.0.0' name='ip' noValidate
                                      onChange={this.handleTextboxChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Please select the information you would like to see</Form.Label>
                        <Form.Check label='WhoIs' name='whois' onChange={this.handleCheckboxChange}/>
                        <Form.Check label='Geo Data' name='geodata' onChange={this.handleCheckboxChange}/>
                        <Form.Check label='Virus Totals' name='virustotal' onChange={this.handleCheckboxChange}/>
                    </Form.Group>
                    {!this.state.loading &&
                    <Button variant='outline-primary' type='submit' onClick={this.handleSubmit}>Submit</Button>}
                    {this.state.loading &&
                    <Button variant='outline-primary' type='submit' disabled><Spinner animation="border"
                                                                                      variant="secondary"
                                                                                      size='sm'/> Loading...</Button>}
                </Form>
                {this.state.showResults && <div id='report-view'/>}
            </Container>
        )
    }
}


// {this.state.whois && this.state.showResults && <ResultView reportType={'WhoIs'} report={}></ResultView>}
// {this.state.geodata && this.state.showResults &&
// <ResultView reportType={'GeoData'} report={}></ResultView>}
// {this.state.virustotal && this.state.showResults &&
// <ResultView reportType={'VirusTotal'} report={}></ResultView>}
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom'

const ipRegex = RegExp(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ip: '',
            whois: false,
            geodata: false,
            virustotal: false,
            validIp: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        if (!this.state.validIp) {
            console.error('Invalid IP');
            alert('The IP submitted is invalid.  Please ensure you are submitting a valid IPv4 address.')
        } else if (!this.state.whois && !this.state.geodata && !this.state.virustotal) {
            console.error('Invalid information selection');
            alert('Please select the information you would like to see.');
        } else {
            console.log(`Submitted IP: ${this.state.ip}`);
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

    render() {
        return (
            <Container fluid>
                <Form onSubmit={this.handleSubmit}>
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
                    <Button variant='primary' type='submit'>Submit</Button>
                </Form>
            </Container>
        )
    }
}
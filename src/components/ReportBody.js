import React from "react";
import {Row, Col, Container} from 'react-bootstrap';

export default class ResultView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            fullReport: this.props.fullReport
        };
    }

    getDateStringFromEpoch = epochDate => {
        var d = new Date(0);
        d.setUTCSeconds(epochDate);
        return d.toString();
    };

    render() {
        if (this.props.reportType === 'Whois') {
            return (
                <Container fluid>
                    <Row className={'mb-3'}>
                        <Col>
                            <h5>Current Owner: {this.props.fullReport.attributes.as_owner}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Autonomous System Number: {this.props.fullReport.attributes.asn}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Last Modification Date: {this.getDateStringFromEpoch(this.props.fullReport.attributes.last_modification_date)}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Last HTTPS Certificate Date: {this.getDateStringFromEpoch(this.props.fullReport.attributes.last_https_certificate_date)}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Registry: {this.props.fullReport.attributes.regional_internet_registry}</p>
                        </Col>
                    </Row>
                </Container>
            )
        } else if (this.props.reportType === 'Geodata') {
            return (
                <Container fluid>
                    <Row className={'mb-3'}>
                        <Col>
                            <h5>Country: {this.props.fullReport.country_name}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Region: {this.props.fullReport.region_name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>City: {this.props.fullReport.city}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Zip Code: {this.props.fullReport.zip}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Longitude: {this.props.fullReport.longitude}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Latitude: {this.props.fullReport.latitude}</p>
                        </Col>
                    </Row>
                </Container>
            )
        } else if (this.props.reportType === 'Virus Total') {
            return (
                <Container fluid>
                    <Row className={'mb-3'}>
                        <Col>
                            <h5>Current Owner: {this.props.fullReport.as_owner}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Autonomous System Number: {this.props.fullReport.asn}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Number of Undetected URLs: {this.props.fullReport.undetected_urls.length}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Number of Downloaded Samples (Both detected and undetected): {this.props.fullReport.undetected_downloaded_samples.length + this.props.fullReport.detected_downloaded_samples.length}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Number of Resolutions: {this.props.fullReport.resolutions.length}</p>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}
import React from 'react';
import './App.css';

import {Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

import SearchPage from "./views/SearchPage";

function App() {
    return (
        <div className="App">
            <Container fluid>
                <Row className="mb-lg-3 mt-lg-3">
                    <Col>
                        <h1>Zach Martin's IP Information Finder</h1>
                    </Col>
                </Row>
                <SearchPage />
            </Container>
        </div>
    );
}

export default App;

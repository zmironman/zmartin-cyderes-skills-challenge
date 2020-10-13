import React from 'react';
import './App.css';

import {Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

import SearchPage from "./views/SearchPage";

function App() {
    document.title = 'IP Information Finder';
    return (
        <div className="App">
            <Container fluid>
                <Row className="mt-5 mb-3">
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

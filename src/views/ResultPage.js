import React from "react";
import Container from "react-bootstrap/Container";

export default class ResultView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const items = [];
        for (const [reportName, reportValue] of this.reports.entries()){
            items.push(<ResultView reportType={reportName} report={reportValue}/>)
        }


        return (
            <Container fluid>
                {items}
            </Container>
        )
    }
}
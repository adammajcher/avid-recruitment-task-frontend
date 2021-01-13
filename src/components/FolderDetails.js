import axios from 'axios';
import React from 'react';
import ReactJson from 'react-json-view'
import { Alert, Form, Button } from 'react-bootstrap'

class FoldersDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Folder: {},
            error: null,
            skip: 0,
            limit: 0,
            query: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.componentDidMount();
    }
    handleChange = (event) => {
        this.setState({ skip: event.target.value })
    }
    handleChange2 = (event) => {
        this.setState({ limit: event.target.value })
    }
    handleChange3 = (event) => {
        this.setState({ query: event.target.value })
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get(`http://localhost:8080/${id}`, {
            params: {
                skip: this.state.skip,
                limit: this.state.limit,
                query: this.state.query
            }
        })
            .then(res => {
                const folder = res.data;
                this.setState({ Folder: folder });
            })
            .catch((error) => this.setState({ error: error }));
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <Alert variant="danger">
                        <Alert.Heading>Folder not found (404 error).</Alert.Heading>
                        <Button onClick={()=>{ this.props.history.push(`/`) }}>Back to folders list</Button>
                    </Alert>
                </div>
            )
        }
        return (
            <div>
                <div>
                    <h1>Folder details:</h1>
                    <Button onClick={()=>{ this.props.history.push(`/`) }}>Back to folders list</Button>
                </div>
                <Form>
                    <Form.Group controlId="formSkip">
                        <Form.Label>Skip</Form.Label>
                        <Form.Control type="number" defaultValue={this.state.skip} onChange={this.handleChange} />
                        <Form.Text className="text-muted">0 default</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formLimit">
                        <Form.Label>Limit</Form.Label>
                        <Form.Control type="number" defaultValue={this.state.limit} onChange={this.handleChange2} />
                        <Form.Text className="text-muted">0 brings full list</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formQuery">
                        <Form.Label>Query</Form.Label>
                        <Form.Control type="text" defaultValue={this.state.query} onChange={this.handleChange3} />
                        <Form.Text className="text-muted">eg. Demo</Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Put some options
            </Button>
                </Form>


                <ReactJson src={this.state.Folder} theme="monokai" />
            </div>
        )
    }
}

export default FoldersDetails
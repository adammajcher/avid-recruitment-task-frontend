import axios from 'axios';
import React from 'react';
import ReactJson from 'react-json-view'
import Alert from 'react-bootstrap/Alert'

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
        this.handleChange3= this.handleChange3.bind(this);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.componentDidMount();
    }
    handleChange = (event) => {
        this.setState({skip: event.target.value})
    }
    handleChange2 = (event) => {
        this.setState({limit: event.target.value})
    }
    handleChange3 = (event) => {
        this.setState({query: event.target.value})
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
                        Go back to <Alert.Link href="http://localhost:3000/">folders list</Alert.Link>.
                    </Alert>
                </div>
            )
        }
        return (
            <div>
                <div>
                    <h1>Folder details:</h1>
                    <p>Go back to <a href="http://localhost:3000/">results list</a>.</p>
                </div>
                <form onSubmit = {this.handleSubmit}>
                    Skip: < input type="number" defaultValue={this.state.skip} onChange={ this.handleChange }/> <br /> (0 default)
                    Limit: < input type="number" defaultValue={this.state.limit} onChange={ this.handleChange2 }/> <br /> (0 brings full list)
                    Query: <input type="text" defaultValue={this.state.query} onChange = {this.handleChange3}/> (will work only if take: "filemob", "masterclip", "subclip", "sequence", "group") <br />
                    <input type="submit" value="Send request"/>
                </form>

                

                <ReactJson src={this.state.Folder} theme="monokai" />
            </div>
        )
    }
}

export default FoldersDetails
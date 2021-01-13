import axios from 'axios';
import React from 'react';
import FolderListSearchForm from './FolderListSearchForm'
import { Table, Form, Button } from 'react-bootstrap'

class FoldersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            folderInfos: [],
            skip: 0,
            limit: 0,
            query: "",
            folderToFind: "",
        };
        this.onClickFolder = this.onClickFolder.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.submitFolder = this.submitFolder.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:8080/`, {
            params: {
                skip: this.state.skip,
                limit: this.state.limit,
                query: this.state.query
            }
        })
            .then(res => {
                const folderInfos = res.data;
                this.setState({ folderInfos: folderInfos.results })
            });
    }
    handleChange = (event) => {
        if (event.target.value) {
            this.setState({ skip: event.target.value })
        }
    }
    handleChange2 = (event) => {
        if (event.target.value) {
            this.setState({ limit: event.target.value })
        }
    }
    handleChange3 = (event) => {
        this.setState({ query: event.target.value })
    }

    handleChange4 = (event) => {
        this.setState({ folderToFind: event.target.value })
    }

    componentDidMount() {

        axios.get(`http://localhost:8080/`, {
            params: {
                skip: this.state.skip,
                limit: this.state.limit,
                query: this.state.query
            }
        })
            .then(res => {
                const folderInfos = res.data;
                this.setState({ folderInfos: folderInfos.results })
            });
    }

    submitFolder(event) {
        this.props.history.push(`/${this.state.folderToFind}`);
    }

    onClickFolder(folderId) {
        this.props.history.push(`/${folderId}`);
    }

    render() {
        return (
            <div>
                <FolderListSearchForm
                    skip={this.state.skip}
                    limit={this.state.limit}
                    query={this.state.query}
                    handleChange={this.handleChange}
                    handleChange2={this.handleChange2}
                    handleChange3={this.handleChange3}
                    handleSubmit={this.handleSubmit} />
                <Form>
                    <Form.Group controlId="folderName">
                        <Form.Label>Folder name to find</Form.Label>
                        <Form.Control type="text" defaultValue={""} onChange={this.handleChange4} />
                        <Form.Text className="text-muted">eg. trolololo, 11, %2F%2Ftest-path%2FCloudUX1%2Fproj1%2Fproj1%20Bin.avb</Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={this.submitFolder}>
                        Find folder
                    </Button>
                </Form>
                <h1><div>Results:</div></h1>
                You can click on folder in table to get it's details.
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Path</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.folderInfos.map(folder =>
                                <tr key={folder.id} onClick={() => { this.onClickFolder(folder.id) }}>
                                    <td>{folder.id}</td>
                                    <td>{folder.path}</td>
                                </tr>)
                        }
                    </tbody>
                </Table>
                <br></br>
            </div>
        )
    }
}

export default FoldersList
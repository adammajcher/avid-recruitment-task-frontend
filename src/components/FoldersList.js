import axios from 'axios';
import React from 'react';

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
        console.log(this.state);
        this.componentDidMount();
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
    
    handleChange4 = (event) =>{
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
                <form onSubmit={this.handleSubmit}>
                    Skip: < input type="number" defaultValue={this.state.skip} onChange={this.handleChange} /> (0 default)<br />
                    Limit: < input type="number" defaultValue={this.state.limit} onChange={this.handleChange2} /> (0 brings full list) <br />
                    Query: <input type="text" defaultValue={this.state.query} onChange={this.handleChange3} /> (eg. Demo)<br />
                    <input type="submit" value="Send request" />
                </form>

                <h1><div>Results:</div></h1>
                {
                    this.state.folderInfos.map(folder => <div key={folder.id} onClick={() => { this.onClickFolder(folder.id) }}>{JSON.stringify(folder)}</div>)
                }
                <br></br>
                <form onSubmit={this.submitFolder}>
                    Folder name: <input type="text" defaultValue="" onChange={this.handleChange4} />  (eg. trolololo, 11, %2F%2Ftest-path%2FCloudUX1%2Fproj1%2Fproj1%20Bin.avb) <br />
                    <input type="submit" value="Find folder" />
                </form>
            </div>
        )
    }
}

export default FoldersList
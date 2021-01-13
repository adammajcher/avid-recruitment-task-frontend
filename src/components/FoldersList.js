import axios from 'axios';
import React from 'react';
import ReactJson from 'react-json-view'

class FoldersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { folderInfos: [] };
        this.onClickFolder = this.onClickFolder.bind(this);
    }

    componentDidMount() {
        console.log("siema", this.state)
        axios.get('http://localhost:8080/')
            .then(res => {
                const folderInfos = res.data;
                this.setState({ folderInfos: folderInfos.results }, ()=>{console.log("po updejcie", this.state)} );
            })
    }

    onClickFolder(folderId) {
        this.props.history.push(`/${folderId}`);
    }

    render() {
        return (
            <div>
                <div>FoldersList</div>
                {
                    this.state.folderInfos.map(folder => <div key={ folder.id } onClick={ ()=>{ this.onClickFolder(folder.id) } }>{JSON.stringify(folder)}</div>)
                }
            </div>
        )}
}

export default FoldersList
import axios from 'axios';
import React from 'react';
import ReactJson from 'react-json-view'

class FoldersDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = { Folder: {} };
    }

    componentDidMount() {
        console.log(this.props.match);
        const { id } = this.props.match.params;
        axios.get(`http://localhost:8080/${id}`)
            .then(res => {
                const folder = res.data;
                this.setState({ Folder: folder }, () => { console.log("po updejcie", this.state) });
            })
    }

    render() {
        return (
            <div>
                <div>FoldersDetails</div>
                <ReactJson src={ this.state.Folder } theme="monokai" />
            </div>
        )
    }
}

export default FoldersDetails
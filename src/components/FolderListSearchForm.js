import React, { useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

function FolderListSearchForm({ skip, limit, query, handleChange, handleChange2, handleChange3, handleSubmit }) {
    useEffect(() => { console.log("hello form did mount") }, []);
    return (
        <Form>
            <Form.Group controlId="formSkip">
                <Form.Label>Skip</Form.Label>
                <Form.Control type="number" defaultValue={skip} onChange={handleChange}/>
                <Form.Text className="text-muted">0 default</Form.Text>
            </Form.Group>
            <Form.Group controlId="formLimit">
                <Form.Label>Limit</Form.Label>
                <Form.Control type="number" defaultValue={limit} onChange={handleChange2}/>
                <Form.Text className="text-muted">0 brings full list</Form.Text>
            </Form.Group>
            <Form.Group controlId="formQuery">
                <Form.Label>Query</Form.Label>
                <Form.Control type="text" defaultValue={query} onChange={handleChange3}/>
                <Form.Text className="text-muted">eg. Demo</Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
                Put options
            </Button>
        </Form>
    )
}

export default FolderListSearchForm
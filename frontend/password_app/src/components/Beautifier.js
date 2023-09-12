import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

import {json} from "react-router-dom";

function Beautifier() {

  const [textAreaValue, setTextAreaValue] = useState('');
  const [textAreaValueBeau, setTextAreaValueBeau] = useState('');
  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
      setTextAreaValueBeau(textAreaValue)
  };
  const removeBorderStyles = {
    border: 'none', // Set the border to "none" to remove it
  };

  return (
    <Container className="mt-5 m-lg-auto">
      <Row>
        <Col md={8}>
          <Form.Group controlId="textArea1">
            <Form.Label>Input</Form.Label>
            <Form.Control as="textarea" rows={8} placeholder="Enter text here" style={{ overflowY: 'scroll' }} onChange={handleTextAreaChange}/>
          </Form.Group>
        </Col >
        <div className=" mt-5" style={removeBorderStyles}>
            <Button size="md" variant="primary" onClick={handleSubmit}>Bautify</Button>
        </div>
        <div className=" mt-5" style={removeBorderStyles}>
          <Col md={8}  rows={12}>
             <Form.Group controlId="textArea1">
               <pre>{textAreaValueBeau}</pre>
          </Form.Group>
          </Col>
        </div>
      </Row>
    </Container>
  );
}

export default Beautifier;

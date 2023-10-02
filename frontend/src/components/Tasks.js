import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Button, Modal, Form } from 'react-bootstrap';
import api from "../api";

function AddTasks() {
  const [tickets, setTickets]= useState([])
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    started_at: '',
    finished_at: '',
    title: '',
    description: '',
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to a server)
    await api.post('/tickets/', formData);
    getTickets();
    setFormData({
    started_at: '',
    finished_at: '',
    title: '',
    description: '',
  })

    handleCloseModal();
  };

    const getTickets= async() => {
        const response = await api.get('/tickets/')
        setTickets(response.data)
    }
    useEffect(() => {
        getTickets();
    }, []);

  return (
    <div className="App">
      <Button variant="primary" onClick={handleShowModal}>
        Open Modal
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="started_at">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="started_at"
                value={formData.started_at}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="finished_at">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="finished_at"
                value={formData.finished_at}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Header</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddTasks;

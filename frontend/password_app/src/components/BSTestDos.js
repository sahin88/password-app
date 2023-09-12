import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
function BsTestDos() {
  const [tickets, setTickets] = useState([
    {
      title: "jjjj",
      description: "iiiiii",
      finished_at: null,
      status: "progress",
      started_at: "2023-09-16"
    },
    {
      title: "f",
      description: "de3f3r",
      finished_at: null,
      status: "progress",
      started_at: "2023-09-20"
    },
    {
      title: "test",
      description: "wring",
      finished_at: null,
      status: "progress",
      started_at: "2023-09-09"
    }
  ]);


  return (

    <Container className="mt-5">
       <DragDropContext>

      {tickets.map((ticket) => (
        <Row key={ticket.id}>
          {" "}
          {/* Ensure each item has a unique key */}
          <Col className="bg-danger p-2 text-white bg-opacity-75" xs={4}>
            {ticket.status === "willbedone" && (
              <Card>
                <Card.Body>
                  <Card.Title>{ticket.title}</Card.Title>
                  <Card.Text>start date: {ticket.started_at} </Card.Text>
                  <Card.Text> end date: {ticket.finished_at} </Card.Text>
                  <Card.Subtitle>description :</Card.Subtitle>
                  <Card.Text>{ticket.description} </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col className="bg-warning p-2 text-white bg-opacity-75" xs={4}>
            {ticket.status === "progress" && (
              <Card>
                <Card.Body>
                  <Card.Title>{ticket.title}</Card.Title>
                  <Card.Text>start date: {ticket.started_at} </Card.Text>
                  <Card.Text> end date: {ticket.finished_at} </Card.Text>
                  <Card.Subtitle>description :</Card.Subtitle>
                  <Card.Text>{ticket.description} </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col className="bg-success p-2 text-white bg-opacity-75" xs={4}>
            {ticket.status === "done" && (
              <Card>
                <Card.Body>
                  <Card.Title>{ticket.title}</Card.Title>
                  <Card.Text>start date: {ticket.started_at} </Card.Text>
                  <Card.Text> end date: {ticket.finished_at} </Card.Text>
                  <Card.Subtitle>description :</Card.Subtitle>
                  <Card.Text>{ticket.description} </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      ))}
      </DragDropContext>
    </Container>

  );
}

export default BsTestDos;

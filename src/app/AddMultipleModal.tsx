/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'


export type AddMultipleModalProps = {
	open: boolean
	handleClose: () => void
}


const AddMultipleModal = (props: AddMultipleModalProps) => {

    const [formValues, setFormValues] = useState([{ name: "", email : ""}])

    
    const handleChange = (i :any, e :any) => {
        const newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    const addFormFields = () => {
        setFormValues([...formValues, { name: "", email: "" }])
      }
    
    const removeFormFields = (i :any) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    const handleSubmit = (event :any) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    return (
      <div>
        <Modal
        centered
        show={props.open}
        onHide={props.handleClose}
        >
			<Modal.Header closeButton>
			    <Modal.Title>Novo Agendamento</Modal.Title>
			</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                {formValues.map((element, index) => (
                        <Form key={index} className='d-flex'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"
                                    value={element.name || ""}
                                    onChange={e => handleChange(index, e)}
                                />

                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                    value={element.email || ""}
                                    onChange={e => handleChange(index, e)}
                                />
                                <Button type='button' className='button' onClick={() => removeFormFields(index)}>
                                    Remover
                                </Button>
                        </Form>                    
                ))}

                    <Container>
                        <Row>
                            <Col xs={4} />
                            <Col xs={4}>
                            <Button className='button' type='button' onClick={() => addFormFields()}>
                                Add
                            </Button>
                            </Col>
                            <Col xs={4} >
                                <Button className="button submit" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                
            </Modal.Body>            
        </Modal>
      </div>
    )
}

export default AddMultipleModal
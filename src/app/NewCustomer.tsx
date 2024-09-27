import * as React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Customer } from './agenda';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export type NewCustomerProps = {
  shopId: string
  onSubmit: (customer: Customer) => void
}

export default function NewCustomer(props :NewCustomerProps) {
  const [customer, setCustomer] = React.useState<Customer | null>(null)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    //submit customer
    handleClose()
  }


  return (
    <div>
      <Button onClick={handleOpen}>Novo</Button>
      <Modal 
        keyboard={false}
        show={open} 
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={event => event.preventDefault()} >
          <Form.Group>
            <Form.Label>
                Nome
            </Form.Label>            
            <Form.Control 
              type="text"
              onChange={(event) => {setCustomer({...customer!, name: event.target.value})} }
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>
                Email
            </Form.Label>            
            <Form.Control 
              type="email"
              onChange={(event) => {setCustomer({...customer!, email: event.target.value})} }
              >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>
                Telefone
            </Form.Label>            
            <Form.Control 
              type="text"
              onChange={(event) => {setCustomer({...customer!, phone: event.target.value})} }
              >
            </Form.Control>
          </Form.Group>          
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="primary" onClick={()=>handleSubmit()}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>          
    </div>
  );
}
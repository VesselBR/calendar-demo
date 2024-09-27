import * as React from 'react';
import { Button, Form, Modal, Toast } from 'react-bootstrap';
//import axios from 'axios';

export type PinModalProps = {
  shopId: string
  setParent: (id: number) => void
  buttonTitle: string
}

export default function PinModal(props :PinModalProps) {
  const [open, setOpen] = React.useState(false);
  const [pin, setPin] = React.useState<string>('')
  const [showToast, setShowToast] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if(pin === '123'){
        //setAuditId('1')
        handleClose()
        props.setParent(1)
        setPin('')

    } else {
        setShowToast(true);
    }
  };


  return (
    <div>

      <Button onClick={handleOpen}> {props.buttonTitle  } </Button>
      
      
      <Modal 
        keyboard={false}
        show={open} 
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Informe seu PIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={event => event.preventDefault()} >
            <Form.Group>
              <Form.Label>
                PIN
              </Form.Label>
              <Form.Control
                type='password'
                value={pin}
                autoFocus
                onChange={(event) => {setPin(event.target.value)}}
                onKeyUp={(event) => {
                  if(event.key === 'Enter'){
                    handleSubmit()
                  }
                }}
              >
              </Form.Control>
            </Form.Group>
          </Form>
          <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Header>
            <strong className="me-auto">Notificação</strong>
          </Toast.Header>
          <Toast.Body>PIN Inválido !</Toast.Body>
        </Toast>          
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
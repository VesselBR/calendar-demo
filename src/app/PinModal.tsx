import * as React from 'react';
import { Button, Form, Modal, Toast } from 'react-bootstrap';
//import axios from 'axios';

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

export type PinModalProps = {
  shopId: string
  setParent: (id: number) => void
  buttonTitle: string
}

export default function PinModal(props :PinModalProps) {
  const [open, setOpen] = React.useState(false);
  const [pin, setPin] = React.useState<string>('')
  const [showToast, setShowToast] = React.useState(false);

  const [auditId, setAuditId] = React.useState<string | null>(null)
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if(pin === '123'){
        setAuditId('1')
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
                onChange={(event :any) => {setPin(event.target.value)}}
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
import moment from 'moment-timezone'
import 'moment/locale/pt-br'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { Booking, CurrentSlot, Customer, Service } from './agenda'
import NewCustomer from './NewCustomer'
import PinModal from './PinModal'

export type AddEventModalProps = {
	shopId: string
	slot: CurrentSlot | null
	open: boolean
	handleClose: () => void
	onAddEvent: (event: Booking) => void
	agendaAudit: boolean
}

const AddEventModal = (props: AddEventModalProps) => {
	const [ausence, setAusence] = useState(false)
	const [observation, setObservation] = useState('')
	const [customers, setCustomers] = useState<Customer[]>([])
	const [services, setServices] = useState<Service[]>([])
	const [auditId, setAuditId] = useState<number | null>(null)
	const [customerId, setCustomerId] = useState<number | undefined>(undefined)
	const [noPreference, setNoPreference] = useState(false)
	const [recurrent, setRecurrent] = useState(false)
	const [recurrentUntil, setrecurrentUntil] = useState<Date | null>(null)
	const [serviceId, setServiceId] = useState<number | undefined>(undefined)

	const [startAt, setStartAt] = useState<Date | null>(null)
	const [endAt, setEndAt] = useState<Date | null>(null)

	moment.tz.setDefault('America/Sao_Paulo')

	const onHandleSubmit = () => {
		const booking :Booking = {
			day: props.slot!.start_at,
			customer_id: customerId,
			staff_id: props.slot!.resourceId,
			no_preference: noPreference,
			start_at: props.slot!.start_at,
			end_at: props.slot!.end_at,
			ausence: ausence,
			observation: observation
		}
		props.onAddEvent(booking)
	}

	useEffect(() => {
		setAuditId(null)
		// Execute
		if (props.slot) {
			setStartAt(props.slot.start_at)
			setEndAt(props.slot.end_at)
			setCustomers([]) 
			setServices([])
		}
	}, [props.open])

	const onNewCustomer = (customer: Customer) => {
		setCustomers([...customers, customer])
	}

	let postButton
	postButton = <PinModal shopId={props.shopId} setParent={(id: number) => setAuditId(id)} buttonTitle='Criar' ></PinModal>
	if (props.agendaAudit === false) {
		postButton = <Button color="success" onClick={(e) => { onHandleSubmit() }}> Criar (sem pin) </Button>
	} else {
		if (auditId) {
			postButton = <Button
				color="success"
				onClick={(e) => { onHandleSubmit() }}
				onKeyUp={(e) => {
					if (e.key === 'Enter') {
						onHandleSubmit()
					}
				}}
			>
				Criar (sem pin)
			</Button>
		}
	}

	return (
		<div
			className="modal show"
			style={{ display: 'block', position: 'initial' }}
		>
			<Modal
				centered
				show={props.open}
				onHide={props.handleClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>Novo Agendamento</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Profissional</Form.Label>
							<Form.Control type="text"
								value={props.slot?.resourceName}
							/>
							<Form.Check type="checkbox" 
								label="Sem Preferência?" 
								value={noPreference} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Check type="checkbox"
								label="Ausência"
								onChange={(event) => { setAusence(event.target.checked) }
								}
							/>
							<Form.Label>Serviço</Form.Label>
							<Form.Select
								disabled={ausence}
								onChange={(event: React.ChangeEvent<any>) => {
									console.log('event changed', event.target)
									const serviceId = parseInt(event.target.value as string)
									const durationEnd = props.slot!.end_at
									const duration = 30 // event.target.value.duration 
									durationEnd.setMinutes(durationEnd.getMinutes() + duration)
									setServiceId(serviceId)
								}}
							>
								{
									services.map((service) => {
										return (<option
											key={service.id}
											value={service.id} >{service.name}</option>)
									})
								}
							</Form.Select>
							<Form.Check type="checkbox"
								label="Recorrente"
								onChange={(event) => { setRecurrent(event.target.checked) }
								}
							/>
							<Form.Label>Recorrente até:</Form.Label>
							<DatePicker 
								selected={recurrentUntil} 
								onChange={(date) => setrecurrentUntil(date) } />

						</Form.Group>
						<Form.Group>
							<Form.Label>Início:</Form.Label>
							<DatePicker
								selected={startAt}
								onChange={(date) => { setStartAt(date) }  }
								showTimeSelect
								showTimeSelectOnly
								//timeIntervals={15}
								timeCaption="Time"
								dateFormat="h:mm aa"
							/>
							<br />
							<Form.Label>Final:</Form.Label>
							<DatePicker
								selected={endAt}
								onChange={ (date) => setEndAt(date)  }
								showTimeSelect
								showTimeSelectOnly
								//timeIntervals={30}
								timeCaption="Time"
								dateFormat="h:mm aa"
							/>

						</Form.Group>
						<Form.Group>
							<Container>
								<Row>
									<Col sm={8}>
									<Form.Label>Cliente</Form.Label>
										<Form.Select
											disabled={ausence}											
											value={customerId}
											onChange={(event) => { 
												setCustomerId(parseInt(event.target.value))} }
										>
											{
												customers.map((customer) => {
													return (<option
														key={customer.id}
														value={customer.id} >{customer.name}</option>)
												})
											}
										</Form.Select>
									
									</Col>
									<Col sm={4}>
										<NewCustomer 
											shopId={props.shopId} 
											onSubmit={onNewCustomer}
											>
										</NewCustomer>
									</Col>
								</Row>
							</Container>
						</Form.Group>
						<Form.Group>
							<Form.Control
								as="textarea"
								placeholder="Incluir observações"
								style={{ height: '100px' }}
								value={observation}
								onChange={(value)=> { setObservation(value.target.value) }}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" 
						onClick={() => {
							setObservation('')
							props.handleClose()
						}} >
						Fechar
					</Button>
					{postButton}
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default AddEventModal
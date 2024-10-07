/* eslint-disable @typescript-eslint/no-explicit-any */
export type CurrentSlot = {
    resourceId: number
    resourceName: string
    start_at: Date
    end_at: Date
}  

export type Group = {
    id: number
    name: string
}

export type Staff = {
    id: number
    value: number
    label: string
    name: string
    nickname: string
    avatar: string
    groupId: number
    active: boolean
    agenda: boolean
    hours: any
}

export type Service = {
    id: number
    name: string
}

export type Customer = {
    id: number
    value: number
    label: string
    name: string
    email: string
    phone: string
}

export type Booking = {
    title?: string
    id?: number
    active?: boolean
    //tenant_id: number
    //shop_id: number
    customer_id?: number
    staff_id: number
    staff_name?: string
    service_id?: number
    start_at: Date
    end_at: Date
    day: Date
    ausence: boolean
    no_preference: boolean
    recurrent?: boolean
    recurrent_until?: Date
    recurrency_type?: number
    observation?: string
    comanda_id?: number
  }
  
  export type AgendaEvent = {
    id: number
    title: string
    start: Date
    end: Date
    resourceId: number
    customer_id?: number
    comandaId?: number
}
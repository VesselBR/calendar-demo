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
  
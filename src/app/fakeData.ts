import { Customer, Service } from "./agenda"

export type Resource = {
    id: number,
    title: string
}

export type MyEvent = {
    id: number
    title: string
    customerId: number
    resourceId: number
    serviceId: number
    start: Date
    end: Date
}

export type WorkingHours = {
    date: number
    open: boolean
    start: number
    end: number
}

export type Shop = {
  id: number
  hours: WorkingHours[]
}

function getRandomInt(min :number, max :number) :number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }


export const getResources = () :Resource[] => {
    const resources :Resource[] = []
    for (let index = 1; index <= 5; index++) {
        resources.push({
            id: index,
            title: `Profissional ${index}`
        })
    }
    return resources
}

export const getEvents = () :MyEvent[] => {
    const events :MyEvent[] = []
    for (let index = 1; index < 10; index++) {
        events.push({
            id: index,
            title: `Evento ${index}`,
            resourceId: getRandomInt(1, 5),
            serviceId:  getRandomInt(1, 5),
            customerId: getRandomInt(1, 5),
            start: new Date( new Date().setHours(getRandomInt(8, 12)) ),
            end: new Date( new Date().setHours(getRandomInt(13, 16)) ),
        })        
    }
    return events
}

export const getServices = () :Service[] => {
    const list :Service[] = []
    for (let index = 1; index < 5; index++) {
        list.push({
            id: index,
            name: `Serviço ${index}`
        })        
    }
    return list

}

export const getCustomers = () :Customer[] => {
    const customers :Customer[] = []
    for (let index = 1; index < 5; index++) {
        customers.push({
            id: index,
            value: index,
            email: `any${index}@teste.com`,
            phone: `${index}${index}${index} - ${index}${index}${index}`,
            name: `Cliente ${index}`,
            label: `Cliente ${index}`
        })        
    }
    return customers
}

export const getShop = () :Shop => {
    return {
        id: 1,
        hours: [
            {
                date: 0,
                open: false,
                start: 0,
                end: 0
            },
            {
                date: 1,
                open: false,
                start: 0,
                end: 0
            },
            {
                date: 2,
                open: true,
                start: 8,
                end: 18
            },
            {
                date: 3,
                open: true,
                start: 10,
                end: 20
            },
            {
                date: 4,
                open: true,
                start: 8,
                end: 18
            },
            {
                date: 5,
                open: true,
                start:10,
                end: 22
            },
            {
                date: 6,
                open: true,
                start: 9,
                end: 23
            }
        ]
    }
}
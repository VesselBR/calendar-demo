
export type Resource = {
    id: number,
    title: string
}

export type Event = {
    id: number
    title: string
    resourceId: number
    start: Date
    end: Date
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

export const getEvents = () :Event[] => {
    const events :Event[] = []
    for (let index = 1; index < 10; index++) {
        events.push({
            id: index,
            title: `Evento ${index}`,
            resourceId: getRandomInt(1, 5),
            start: new Date( new Date().setHours(getRandomInt(8, 12)) ),
            end: new Date( new Date().setHours(getRandomInt(13, 16)) ),
        })        
    }
    return events
}
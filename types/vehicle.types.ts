export interface VehicleData{
    EquipmentId: string,
    latitude: number,
    longitude: number,
    speed: number,
    odometerReading: number,
    eventDate: number,
    eventGeneratedTime: number,
}

export interface Stoppage{
    latitude: number,
    longitude: number,
    reachTime: number,
    endTime: number,
    duration : number,
}
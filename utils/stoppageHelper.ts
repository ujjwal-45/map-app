import { VehicleData, Stoppage } from '../types/vehicle.types';

// export const identifyStoppages = (vehicleData: VehicleData[], threshold: number): Stoppage[] => {
//   const stoppages: Stoppage[] = [];
//   let currentStoppage: Stoppage | null = null;

//   // console.log("Vehicle Data:", vehicleData);

//   for (let i = 0; i < vehicleData.length; i++) {
//     const { latitude, longitude, speed, eventGeneratedTime } = vehicleData[i];
//     //  console.log("Processing vehicle:", vehicleData[i]);

//     if (speed === 0) {
//       if (!currentStoppage) {
//         currentStoppage = {
//           latitude: latitude,
//           longitude: longitude,
//           reachTime: eventGeneratedTime,
//           endTime: eventGeneratedTime,
//           duration: 0,
//         };
//       }
//       else {
//         currentStoppage.endTime = eventGeneratedTime;
//       }
//     }
//     else {
//       if (currentStoppage) {
//         currentStoppage.duration = Math.abs(currentStoppage.endTime - currentStoppage.reachTime) / 60000;
//          if (currentStoppage.duration >= threshold / 60000) {
//           stoppages.push(currentStoppage);
//           // console.log("Added stoppage:", currentStoppage);
//          }
//         currentStoppage = null;
//       } 
//     }
//   }

//   if (currentStoppage) {
//     currentStoppage.duration = Math.abs(currentStoppage.endTime - currentStoppage.reachTime) / 60000;
//     if (currentStoppage.duration >= threshold / 60000) {
//       stoppages.push(currentStoppage);
//     }
//   }
//    console.log("Stoppages:", stoppages);

//   return stoppages;
// };


export const identifyStoppages = (vehicleData: VehicleData[], threshold: number): Stoppage[] => {
  const stoppages: Stoppage[] = [];
  // console.log("veh", vehicleData);

  for (let i = 1; i < vehicleData.length; i++) {
    const current = vehicleData[i];
    const previous = vehicleData[i - 1];

    if (current.speed === 0) {
      const duration = Math.abs(current.eventGeneratedTime - previous.eventGeneratedTime) / 60000; // convert milliseconds to minutes

      if (duration >= threshold / 60000) {
        stoppages.push({
          latitude: current.latitude,
          longitude: current.longitude,
          reachTime: previous.eventGeneratedTime,
          endTime: current.eventGeneratedTime,
          duration: duration,
        });

      }
    }
  }

  console.log("Stoppages:", stoppages);

  return stoppages;
};
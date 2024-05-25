import dynamic from "next/dynamic";

const VehicleMap = dynamic(() => import('./VehicleMap.ts'), { ssr: false });
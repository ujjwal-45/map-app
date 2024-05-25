import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });
import { VehicleData, Stoppage } from '@/types/vehicle.types';
import { identifyStoppages } from "@/utils/stoppageHelper";

interface HomeProps{
  vehicleData: VehicleData[];
  stoppages: Stoppage[];
}
const VehicleMap = dynamic(() => import('./components/VehicleMap'), { ssr: false });


const Home: React.FC<HomeProps> = ({ vehicleData, stoppages }) => {
   
  // console.log('mapped_data', vehicleData);
  return (
    <div >
      <VehicleMap vehicleData={vehicleData} stoppages={stoppages} />
   </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get('http://localhost:3001/api/vehicle');
    const vehicleData = res.data as VehicleData[];

    const stoppages = identifyStoppages(vehicleData, 120000);
    // console.log('stoopage_data', stoppages);
    
    return {
      props: {
        vehicleData,
        stoppages,
      },
      
    };
  }
  catch (error) {
    console.log('Error while fetching data', error);
    return {
       props: {
        vehicleData:[],
        stoppages:[],
      },
    }
  }
  
}

export default Home;

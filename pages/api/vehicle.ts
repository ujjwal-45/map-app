
import type { NextApiRequest, NextApiResponse } from "next";

import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'
import { VehicleData } from '@/types/vehicle.types';

export default function handler(req: NextApiRequest , res: NextApiResponse) {
    const filePath = path.resolve('./public', 'gps_data.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    Papa.parse<VehicleData>(fileContent, {
        header: true,
        complete: (results) => {
            res.status(200).json(results.data);
        },
        error: (error: Error) => {
            res.status(500).json({ error: error.message });
        }
    });
};
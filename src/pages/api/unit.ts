import { NextApiRequest, NextApiResponse } from "next";
import unitData from './unit.json'
export default function handler(req: NextApiRequest , res:NextApiResponse){
    res.status(200).json(unitData);
}
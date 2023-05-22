import { NextApiRequest, NextApiResponse } from "next";
import unitItemData from './unit-item.json'
export default function handler(req: NextApiRequest , res:NextApiResponse){
    res.status(200).json(unitItemData);
}
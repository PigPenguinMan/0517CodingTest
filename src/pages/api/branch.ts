import { NextApiRequest, NextApiResponse } from "next";
import branchData from './branch.json'
export default function handler(req: NextApiRequest , res:NextApiResponse){
    res.status(200).json(branchData);
}
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { log } from 'console';
import { useEffect, useState } from 'react';
const UnitPage = dynamic(()=>import('../../components/Layout/unit'))
type UnitProps ={
  unit:{
    id:number,
    branchId:number,
    unitName:string,
    numberOfUnitItems:number,
    width:number,
    depth:number,
    height:number,
    priceValue:number,
    createdAt:String,
    updatedAt:String
  }[]
}
type  BranchProps ={
  branch: {
      id: number;
      branchName: string;
      isAvailable: number;
      isExamined: number;
      numberOfUnits: number;
      createdAt: string;
      updatedAt: string;
    }[];
}
type UnitItemProps={
  item: {
    id:number,
    unitId:number,
    unitItemName:string,
    startDate:string,
    endDate:string,
    createdAt:string,
    updateAt:string
  }[]
}
const Unit: React.FC<UnitProps&BranchProps&UnitItemProps> = ({ unit, branch, item }) => {
 
    const router = useRouter();
  const {unitId} = router.query

   return(
    <UnitPage unit={unit} branch={branch} item={item}  />
  )
};

export default Unit;

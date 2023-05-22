import PageLayout from  '../../components/Layout/index'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BranchPage from "../../components/Layout/branch";


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
const Branch: React.FC<BranchProps> = ({ branch }) => {

    const router = useRouter();
    const {id} = router.query;
    console.log();
    

    return ( 
        <PageLayout >
        <div>
            <BranchPage branch={branch}/>
        </div>
        </PageLayout>
     );
}

 
export default Branch ;
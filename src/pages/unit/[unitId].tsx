import PageLayout from  '../../components/Layout/index'
import UnitPage from '../../components/Layout/unit';
import { useRouter } from 'next/router';

type UnitProps ={
  unit: {
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
  }[];
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
  const { id } = router.query;
  return (
    <PageLayout>
      <div>
        <UnitPage unit={unit} branch={branch} item={item} />
      </div>
    </PageLayout>
  );
};

export default Unit;

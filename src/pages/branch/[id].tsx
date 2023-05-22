import PageLayout from '../../components/Layout/index';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const BranchPage = dynamic(()=>import('components/Layout/branch'))
type BranchProps = {
  branch: {
    id: number;
    branchName: string;
    isAvailable: number;
    isExamined: number;
    numberOfUnits: number;
    createdAt: string;
    updatedAt: string;
  }[];
};
const Branch: React.FC<BranchProps> = ({ branch }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router);
  
  return (
      <div>
        <BranchPage branch={branch} />
      </div>
  );
};

export default Branch;

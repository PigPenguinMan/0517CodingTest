import PageLayout from '../../components/Layout/pageLayout';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const BranchPage = dynamic(()=>import('../../components/Layout/branch'))
type BranchProps = {
  branch?: {
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
  console.log('brnch in Id',branch);

  return (
        <BranchPage branch={branch} />
  );
};

export default Branch;

import { PricingTable } from "@clerk/nextjs";

interface Props {}

const Subscription = ({}: Props) => {
  return (
    <div>
      Subscription
      <PricingTable />
    </div>
  );
};

export default Subscription;

import UGFeesTable from "./UGFeesTable";
import PGFeesTable from "./PGFeesTable";

interface Props {
  selected: "all" | "ug" | "pg";
}

const FeesContent = ({ selected }: Props) => {
  return (
    <>
      {(selected === "all" || selected === "ug") && (
        <UGFeesTable />
      )}

      {(selected === "all" || selected === "pg") && (
        <PGFeesTable />
      )}
    </>
  );
};

export default FeesContent;
import { NodeType } from "../type/type";

export type GraphEntityDetailsProps = {
  node: NodeType;
};

export default function GraphEntityDetails(props: GraphEntityDetailsProps) {
  const node = props.node;

  return (
    <>
      {node && node?.name && (
        <div className="flex flex-col w-full overflow-auto">
          <table className="bg-reg-white rounded-md w-full">
            <tbody>
              <tr className="border-b border-reg-gray-200">
                <td className="text-reg-blue-700 px-3 py-3 w-1/2">
                  <p className="text-reg-gray-500 text-[12px]">Id</p>
                </td>
                <td className="px-3 py-3 text-reg-gray-800 font-medium w-1/2 text-[12px]">{node.entityCode}</td>
              </tr>
              <tr className="border-b border-reg-gray-200">
                <td className="text-reg-blue-700 px-3 py-3 w-1/2">
                  <p className="text-reg-gray-500 text-[12px]">Name</p>
                </td>
                <td className="px-3 py-3 text-reg-gray-800 font-medium w-1/2 text-[12px]">{node.name}</td>
              </tr>
              <tr className="border-b border-reg-gray-200">
                <td className="text-reg-blue-700 px-3 py-3 w-1/2">
                  <p className="text-reg-gray-500 text-[12px]">Business Type</p>
                </td>
                <td className="px-3 py-3 text-reg-gray-800 font-medium w-1/2 text-[12px]">{node.businessType}</td>
              </tr>
              <tr className="border-b border-reg-gray-200">
                <td className="text-reg-blue-700 px-3 py-3 w-1/2">
                  <p className="text-reg-gray-500 text-[12px]">Incorporation Jurisdiction</p>
                </td>
                <td className="px-3 py-3 text-reg-gray-800 font-medium w-1/2 text-[12px]">{node.incorporationJurisdiction}</td>
              </tr>
              <tr className="border-b border-reg-gray-200">
                <td className="text-reg-blue-700 px-3 py-3 w-1/2">
                  <p className="text-reg-gray-500 text-[12px]">Sub National</p>
                </td>
                <td className="px-3 py-3 text-reg-gray-800 font-medium w-1/2 text-[12px]">{node.subNational}</td>
              </tr>
              <tr className="border-b border-reg-gray-200">
                <td className="text-reg-blue-700 px-3 py-3 w-1/2">
                  <p className="text-reg-gray-500 text-[12px]">SIC Code</p>
                </td>
                <td className="px-3 py-3 text-reg-gray-800 font-medium w-1/2 text-[12px]">{node.sicCode}</td>
              </tr>
              <tr className="border-b border-reg-gray-200">
                <td className="text-reg-blue-700 px-3 py-3 w-1/2">
                  <p className="text-reg-gray-500 text-[12px]">Tax Residence Jurisdiction</p>
                </td>
                <td className="px-3 py-3 text-reg-gray-800 font-medium w-1/2 text-[12px]">{node.taxResidenceJurisdiction}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

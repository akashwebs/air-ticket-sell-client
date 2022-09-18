import React, { useEffect, useState } from "react";
import Heading from "../../Shared/Heading";
import Loading from "../../Shared/Loading";
import FamilyMemberRow from "./AllSellRow";
import { useQuery } from "@tanstack/react-query";
import AllSellRow from "./AllSellRow";

const AllSell = () => {
  // ----------------current balance---
  let balanceUrl = "https://air-ticket-sell-server.vercel.app/current-balance";
  const {
    isLoading: currentLoading,
    data: balance,
    refetch: currentRefetch,
  } = useQuery(["current-blance-get"], () =>
    fetch(balanceUrl).then((res) => res.json())
  );

  let url = `https://air-ticket-sell-server.vercel.app/all-sell`;

  const {
    isLoading,
    error,
    data: sells,
    refetch,
  } = useQuery(["all-sell-details"], () =>
    fetch(url).then((res) => res.json())
  );
  /* const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(members?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(members?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, members]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % members?.length;
    setItemOffset(newOffset);
  };
 */
  if ((isLoading, currentLoading)) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Heading>All Sell Info</Heading>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Date</th>
              <th>description/fax</th>
              <th>PNR</th>
              <th>DR taka</th>
              <th>CR taka</th>
              <th>Closing Balance</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={7}>
                <div className="flex justify-between pr-40 text-sm font-bold">
                  <span>Current Closing Balance: </span>
                  <span>{balance?.currentBalance} </span>
                </div>
              </td>
            </tr>
            {sells?.map((sell) => (
              <AllSellRow
                key={sell?._id}
                sell={sell}
                refetch={refetch}
                currentRefetch={currentRefetch}
              ></AllSellRow>
            ))}
          </tbody>

          <tfoot className="">
            <tr className="">
              {/* paginate */}
              <td colSpan={5} className="">
                <div className="">
                  {/*  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    containerClassName="btn-group pagination"
                    pageLinkClassName="btn btn-sm"
                    previousLinkClassName="btn-sm btn"
                    nextLinkClassName="btn btn-sm"
                    activeClassName="pagination-active"
                  /> */}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        {/* <FamilyUpdateModal
          idName={memberId}
          refetch={refetch}
        ></FamilyUpdateModal> */}
      </div>
    </>
  );
};

export default AllSell;

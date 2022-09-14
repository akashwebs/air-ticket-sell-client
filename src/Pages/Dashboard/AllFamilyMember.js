import React, { useEffect, useState } from "react";
import Heading from "../../Shared/Heading";
import Loading from "../../Shared/Loading";
import FamilyMemberRow from "./FamilyMemberRow";
import { useQuery } from "@tanstack/react-query";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import FamilyUpdateModal from "./FamilyUpdateModal";

const AllFamilyMember = () => {
  const [memberId, setMemberId] = useState("");
  const handleDeleteMember = (id) => {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover " "`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `https://rokto-bondon-server.vercel.app/delete-family-member/${id}`;
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
          });

        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal(`file is safe!`);
      }
    });
  };

  let url = `https://rokto-bondon-server.vercel.app/all-family-member`;

  const {
    isLoading,
    error,
    data: members,
    refetch,
  } = useQuery(["allMemberProfile"], () =>
    fetch(url).then((res) => res.json())
  );
  const [currentItems, setCurrentItems] = useState([]);
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

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Heading>All Family Member</Heading>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Position</th>
              <th>social Link</th>
              <th>action</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((member, index) => (
              <FamilyMemberRow
                key={member?._id}
                member={member}
                index={index + 1}
                refetch={refetch}
                handleDeleteMember={handleDeleteMember}
                setMemberId={setMemberId}
              ></FamilyMemberRow>
            ))}
          </tbody>

          <tfoot className="">
            <tr className="">
              {/* paginate */}
              <td colSpan={5} className="">
                <div className="">
                  <ReactPaginate
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
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        <FamilyUpdateModal
          idName={memberId}
          refetch={refetch}
        ></FamilyUpdateModal>
      </div>
    </>
  );
};

export default AllFamilyMember;

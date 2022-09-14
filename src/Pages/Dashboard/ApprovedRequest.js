import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import Heading from "../../Shared/Heading";
import Loading from "../../Shared/Loading";
import ApprovedRequestRow from "./ApprovedRequestRow";
import RequestModals from "./RequestModals";

const ApprovedRequest = () => {
  const [id, setId] = useState("");

  const url = `https://rokto-bondon-server.vercel.app/approvedRequestDashboard`;

  const {
    isLoading,
    error,
    data: donners,
    refetch,
  } = useQuery(["donnerRequestsApproved"], () =>
    fetch(url).then((res) => res.json())
  );

  // pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(donners?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(donners?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, donners]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % donners?.length;
    setItemOffset(newOffset);
  };

  // paginatoin end

  if (isLoading) {
    return <Loading></Loading>;
  }
  const handleDaleteDonner = (id) => {
    const url = `https://rokto-bondon-server.vercel.app/requestDelete/${id}`;

    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover "`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
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
        swal(`your file is safe!`);
      }
    });
  };
  const handleApprovedDonner = (profile) => {
    const url = `https://rokto-bondon-server.vercel.app/approvedRequest/${profile.email}`;
    const postUrl = `https://rokto-bondon-server.vercel.app/requestPost/${profile.email}`;
    const profileInfo = { ...profile, approved: true };
    delete profileInfo._id;

    swal({
      title: "Are you sure?",
      text: `Approve it?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((approve) => {
      if (approve) {
        // update or post main donner profile
        fetch(postUrl, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(profileInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
          });
        // update requst collection
        fetch(url, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ request: false }),
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
          });

        swal("donner profile approved", {
          icon: "success",
        });
      } else {
        swal(`cancled approved profile`);
      }
    });
  };

  return (
    <div>
      <Heading>Donner Request</Heading>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th className="flex items-center">
                <span> Phone </span>
              </th>
              <th>Blood Group</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((donner, index) => {
              return (
                <ApprovedRequestRow
                  key={donner?._id}
                  donner={donner}
                  refetch={refetch}
                  setId={setId}
                  handleDaleteDonner={handleDaleteDonner}
                  handleApprovedDonner={handleApprovedDonner}
                ></ApprovedRequestRow>
              );
            })}
          </tbody>

          <tfoot>
            <tr className="">
              {/* paginate */}
              <td colSpan={5} className="">
                <div>
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
      </div>
      <RequestModals id={id}></RequestModals>
    </div>
  );
};

export default ApprovedRequest;

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import Heading from "../../Shared/Heading";
import Loading from "../../Shared/Loading";
import DonnerEditModal from "./DonnerEditModal";
import DonnerListRow from "./DonnerListRow";

const DonnerList = () => {
  const [donnerId, setDonnerId] = useState("");

  let url = `http://localhost:5000/allDonner/all`;

  const handleDonnerSerach = (e) => {
    e.preventDefault();
    const searchInfo = e.target.serachInfo.value.toLowerCase();
    console.log(searchInfo);
    if (!searchInfo) {
      url = `http://localhost:5000/allDonner/all`;
      refetch();
      return;
    }
    url = `http://localhost:5000/allDonner/${searchInfo}`;
    refetch();
  };

  const handleGroupFilter = (e) => {
    const filterGroup = e.target.value.toLowerCase();
    url = `http://localhost:5000/allDonner/${filterGroup}`;
    refetch();
  };

  const {
    data: donners,
    isLoading,
    refetch,
  } = useQuery(["allDonnerListForDonnerLiist"], () =>
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

  const handleDaleteDonner = (id) => {
    const url = `http://localhost:5000/deleteDonnerProfile/${id}`;

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

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <Heading>
        <div className="grid md:grid-cols-2 grid-cols-1 justify-between">
          <div>All Donner</div>
          <div className="flex items-center">
            <div>
              <select
                onChange={(e) => handleGroupFilter(e)}
                name="sliderFilter"
                class="select select-bordered w-full md:w-15 ml-2"
              >
                <option selected>All</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>
            {/* serach data with phone, name */}
            <form onSubmit={handleDonnerSerach} class="form-control ml-5">
              <div class="input-group">
                <input
                  name="serachInfo"
                  type="text"
                  placeholder="Search…"
                  class="input input-bordered"
                />
                <button type="submit" class="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Heading>

      <div class="overflow-x-auto w-full">
        <table class="table w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th className="flex items-center">
                <span> Phone </span>
              </th>
              <th>Blood Group</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((donner, index) => (
              <DonnerListRow
                key={donner?._id}
                donner={donner}
                index={index + 1}
                refetch={refetch}
                setDonnerId={setDonnerId}
                handleDaleteDonner={handleDaleteDonner}
              ></DonnerListRow>
            ))}
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
      <DonnerEditModal donnerId={donnerId} refetch={refetch}></DonnerEditModal>
    </div>
  );
};

export default DonnerList;

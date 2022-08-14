import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
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
    url = `http://localhost:5000/allDonner/${searchInfo}`;
    refetch();
  };

  const {
    isLoading,
    error,
    data: donners,
    refetch,
  } = useQuery(["allDonnerList"], () => fetch(url).then((res) => res.json()));

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleBannerFilter = (e) => {
    /*
    e.preventDefault();
    let newUrl = e.target.value;
    url = `http://localhost:5000/allBanner/${newUrl}`;

    refetch(); */
  };

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

  return (
    <div>
      <Heading>
        <div className="grid md:grid-cols-2 grid-cols-1 justify-between">
          <div>All Donner</div>
          <div className="flex items-center">
            <div>
              <select
                onChange={(e) => handleBannerFilter(e)}
                name="sliderFilter"
                class="select select-bordered w-full md:w-15 ml-2"
              >
                <option disabled selected>
                  Filter
                </option>
                <option>All</option>
                <option>Hide</option>
                <option>Unhide</option>
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
                <form>
                  <select
                    onChange={(e) => handleBannerFilter(e)}
                    name="sliderFilter"
                    class="select select-bordered w-full md:w-15 ml-2"
                  >
                    <option disabled selected>
                      Filter
                    </option>
                    <option>All</option>
                    <option>Hide</option>
                    <option>Unhide</option>
                  </select>
                </form>
              </th>
              <th>Blood Group</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donners?.map((donner, index) => (
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
            <tr>{/* herer pagination */}</tr>
          </tfoot>
        </table>
      </div>
      <DonnerEditModal donnerId={donnerId} refetch={refetch}></DonnerEditModal>
    </div>
  );
};

export default DonnerList;

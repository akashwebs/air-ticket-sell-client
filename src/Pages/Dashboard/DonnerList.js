import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import swal from "sweetalert";
import Heading from "../../Shared/Heading";
import Loading from "../../Shared/Loading";
import DonnerEditModal from "./DonnerEditModal";
import DonnerListRow from "./DonnerListRow";

const DonnerList = () => {
  const [donnerId, setDonnerId] = useState("");

  let url = `http://localhost:5000/allDonner`;

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
        All Donner
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

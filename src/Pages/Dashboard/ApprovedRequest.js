import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import swal from "sweetalert";
import Heading from "../../Shared/Heading";
import Loading from "../../Shared/Loading";
import ApprovedRequestRow from "./ApprovedRequestRow";
import RequestModals from "./RequestModals";

const ApprovedRequest = () => {
  const [id, setId] = useState("");

  const url = `http://localhost:5000/approvedRequestDashboard`;

  const {
    isLoading,
    error,
    data: donners,
    refetch,
  } = useQuery(["donnerRequests"], () => fetch(url).then((res) => res.json()));
  console.log(donners);
  if (isLoading) {
    return <Loading></Loading>;
  }
  const handleDaleteDonner = (id) => {
    const url = `http://localhost:5000/requestDelete/${id}`;

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
    const url = `http://localhost:5000/approvedRequest/${profile.email}`;
    const postUrl = `http://localhost:5000/requestPost/${profile.email}`;
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
      <div class="overflow-x-auto w-full">
        <table class="table w-full">
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
            {donners?.map((donner, index) => {
              return (
                <ApprovedRequestRow
                  key={donner.donner?._id}
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
            <tr>{/* herer pagination */}</tr>
          </tfoot>
        </table>
      </div>
      <RequestModals id={id}></RequestModals>
    </div>
  );
};

export default ApprovedRequest;

import React from "react";
import Heading from "../../Shared/Heading";
import Loading from "../../Shared/Loading";
import FamilyMemberRow from "./FamilyMemberRow";
import { useQuery } from "@tanstack/react-query";
import swal from "sweetalert";

const AllFamilyMember = () => {
  const handleDeleteMember = (id) => {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover " "`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `http://localhost:5000/delete-family-member/${id}`;
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

  let url = `http://localhost:5000/all-family-member`;

  const {
    isLoading,
    error,
    data: member,
    refetch,
  } = useQuery(["allMemberProfile"], () =>
    fetch(url).then((res) => res.json())
  );

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
            </tr>
          </thead>
          <tbody>
            {member?.map((member, index) => (
              <FamilyMemberRow
                key={member?._id}
                member={member}
                index={index + 1}
                refetch={refetch}
                handleDeleteMember={handleDeleteMember}
              ></FamilyMemberRow>
            ))}
          </tbody>

          <tfoot>
            <tr>{/* herer pagination */}</tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default AllFamilyMember;

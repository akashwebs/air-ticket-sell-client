import React from "react";

const ApprovedRequestRow = ({
  donner,
  setId,
  handleDaleteDonner,
  handleApprovedDonner,
}) => {
  const { fullName, phone, _id, bloodGroup, img, email } = donner;
  return (
    <tr>
      <th>
        {img ? (
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <img src={donner?.img} alt="profile" />
            </div>
          </div>
        ) : (
          <button className="btn btn-xs bg-red-600">Messing</button>
        )}
      </th>
      <td>
        <div class="flex items-center space-x-3">
          <div>
            <div class="font-bold text-sm ">{fullName}</div>
          </div>
        </div>
      </td>
      <td>{phone}</td>
      <td>{bloodGroup}</td>
      <td>
        <label
          onClick={() => setId(donner)}
          for="request-approved-modal"
          class="btn btn-primary btn-xs text-white"
        >
          view Profile
        </label>
        <button
          onClick={() => handleDaleteDonner(_id)}
          class="btn btn-warning btn-xs text-black ml-2"
        >
          Delete
        </button>
        <button
          onClick={() => handleApprovedDonner(donner)}
          class="btn btn-accent btn-xs text-black ml-2"
        >
          Approved
        </button>
      </td>
      <td></td>
    </tr>
  );
};

export default ApprovedRequestRow;

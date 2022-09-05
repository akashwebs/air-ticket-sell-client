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
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={donner?.img} alt="profile" />
            </div>
          </div>
        ) : (
          <button className="btn btn-xs bg-red-600">Messing</button>
        )}
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold text-sm ">{fullName}</div>
          </div>
        </div>
      </td>
      <td>{phone}</td>
      <td>{bloodGroup}</td>
      <td>
        <label
          onClick={() => setId(donner)}
          htmlFor="request-approved-modal"
          className="btn btn-primary btn-xs text-white"
        >
          view Profile
        </label>
        <button
          onClick={() => handleDaleteDonner(_id)}
          className="btn btn-warning btn-xs text-black ml-2"
        >
          Delete
        </button>
        <button
          onClick={() => handleApprovedDonner(donner)}
          className="btn btn-accent btn-xs text-black ml-2"
        >
          Approved
        </button>
      </td>
      <td></td>
    </tr>
  );
};

export default ApprovedRequestRow;

import React from "react";

const DonnerListRow = ({ donner, index, setDonnerId, handleDaleteDonner }) => {
  const { img, fullName, phone, _id, bloodGroup } = donner;

  return (
    <tr>
      <th>{index}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={img} alt="banner image" />
            </div>
          </div>
          <div>
            <div className="font-bold text-sm ">{fullName}</div>
          </div>
        </div>
      </td>
      <td>{phone}</td>
      <td>{bloodGroup}</td>
      <td>
        <label
          onClick={() => setDonnerId(_id)}
          htmlFor="donner_edit_modal"
          className="btn btn-primary btn-xs text-white"
        >
          Edit
        </label>
        <button
          onClick={() => handleDaleteDonner(_id)}
          className="btn btn-warning btn-xs text-black ml-2"
        >
          Delete
        </button>
      </td>
      <td></td>
    </tr>
  );
};

export default DonnerListRow;

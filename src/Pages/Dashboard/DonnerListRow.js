import React from "react";

const DonnerListRow = ({ donner, index }) => {
  const { img, fullName, phone, _id, bloodGroup } = donner;

  const handleDelete = () => {};
  const handleEdit = () => {};

  return (
    <tr>
      <th>{index}</th>
      <td>
        <div class="flex items-center space-x-3">
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <img src={img} alt="banner image" />
            </div>
          </div>
          <div>
            <div class="font-bold text-sm ">{fullName}</div>
          </div>
        </div>
      </td>
      <td>{phone}</td>
      <td>{bloodGroup}</td>
      <td>
        <label
          onClick={() => handleEdit()}
          for="donner_edit_modal"
          class="btn btn-primary btn-xs text-white"
        >
          Edit
        </label>
        <button
          onClick={handleDelete}
          class="btn btn-warning btn-xs text-black ml-2"
        >
          Delete
        </button>
      </td>
      <td></td>
    </tr>
  );
};

export default DonnerListRow;

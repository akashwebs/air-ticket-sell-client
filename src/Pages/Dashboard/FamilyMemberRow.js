import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { toast } from "react-toastify";

const FamilyMemberRow = ({
  member,
  index,
  refetch,
  handleDeleteMember,
  setMemberId,
}) => {
  const handleOrders = (e) => {
    e.preventDefault();

    const url = `https://rokto-bondon-server.vercel.app/update-family-member/${member?._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ orders: e.target.orders.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("updated");
          refetch();
        }
      });
  };

  return (
    <tr>
      <th>{index}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={member?.image} alt="member image" />
            </div>
          </div>
          <div>
            <div className="font-bold text-sm ">{member?.fullName}</div>
          </div>
        </div>
      </td>
      <td>{member?.postion}</td>

      <td>
        <div className="">
          <a
            href={`${member?.facebook}`}
            className="bg-white inline-block rounded-sm  mr-2"
          >
            <FaFacebookSquare className="text-2xl text-blue-800 hover:text-blue-600" />
          </a>
          <a
            href={`https://wa.me/${member?.whatsapp}`}
            className="bg-white inline-block rounded-sm  mr-2"
          >
            <FaWhatsapp className="text-2xl text-[#2fb1e8] hover:text-blue-600" />
          </a>
          <a
            href={member?.instagram}
            className="bg-white inline-block rounded-sm  mr-2"
          >
            <FaInstagramSquare className="text-2xl text-pink-600 hover:text-pink-400" />
          </a>
        </div>
      </td>
      <td>
        <label
          onClick={() => setMemberId(member)}
          className="btn btn-info btn-xs text-black ml-2"
          htmlFor="family-update-modal"
        >
          Edit
        </label>
        <button
          onClick={() => handleDeleteMember(member._id)}
          className="btn btn-warning btn-xs text-black ml-2"
        >
          Delete
        </button>
      </td>
      <td>``
        <form onSubmit={handleOrders}>
          <input
            className="input input-bordered w-16 px-2 mr-2"
            defaultValue={member?.orders}
            name="orders"
            type={"number"}
          />
          <input
            className="btn btn-primary btn-square"
            value={"set"}
            type={"submit"}
          />
        </form>
      </td>
    </tr>
  );
};

export default FamilyMemberRow;

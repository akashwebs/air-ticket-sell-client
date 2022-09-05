import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const BannerListRow = ({ bannerRow, index, refetch }) => {
  // const [hide, setHide] = useState(false);

  const handleHide = () => {
    const url = `http://localhost:5000/updatebanner/${bannerRow?._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ hide: !bannerRow.hide }),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };
  const handleDeleteBanner = () => {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover " ${bannerRow?.bannerName}"`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `http://localhost:5000/deleteBanner/${bannerRow?._id}`;
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
        swal(`"${bannerRow?.bannerName}" file is safe!`);
      }
    });
  };

  const handleOrders = (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/updatebanner/${bannerRow?._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ orders: e.target.orders.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };
  return (
    <tr>
      <th>{index}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={
                  bannerRow?.bannerImage
                    ? bannerRow?.bannerImage
                    : bannerRow?.extraUrl
                }
                alt="banner image"
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-sm ">{bannerRow?.bannerName}</div>
          </div>
        </div>
      </td>
      <td>
        {bannerRow?.hide && (
          <button
            onClick={() => handleHide()}
            className="btn btn-primary btn-xs text-white"
          >
            unhide
          </button>
        )}
        {!bannerRow?.hide && (
          <button
            onClick={() => handleHide()}
            className="btn btn-primary btn-xs text-white"
          >
            hide
          </button>
        )}

        <button
          onClick={handleDeleteBanner}
          className="btn btn-warning btn-xs text-black ml-2"
        >
          Delete
        </button>
      </td>
      <td>
        <form onSubmit={handleOrders}>
          <input
            className="input input-bordered w-12 px-2 mr-2"
            defaultValue={bannerRow?.orders}
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

export default BannerListRow;

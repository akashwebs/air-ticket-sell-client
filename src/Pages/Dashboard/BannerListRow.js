import React, { useEffect, useState } from "react";

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
        console.log(data);
        refetch();
      });
  };
  const handleDeleteBanner = () => {
    const url = `http://localhost:5000/deleteBanner/${bannerRow?._id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      });
  };
  return (
    <tr>
      <th>{index}</th>
      <td>
        <div class="flex items-center space-x-3">
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
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
            <div class="font-bold text-sm ">{bannerRow?.bannerName}</div>
          </div>
        </div>
      </td>
      <td>
        {bannerRow?.hide && (
          <button
            onClick={() => handleHide()}
            class="btn btn-primary btn-xs text-white"
          >
            unhide
          </button>
        )}
        {!bannerRow?.hide && (
          <button
            onClick={() => handleHide()}
            class="btn btn-primary btn-xs text-white"
          >
            hide
          </button>
        )}

        <button
          onClick={handleDeleteBanner}
          class="btn btn-warning btn-xs text-black ml-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BannerListRow;

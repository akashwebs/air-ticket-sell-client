import React, { useEffect, useState } from "react";
import Loading from "../../Shared/Loading";
import BannerListRow from "./BannerListRow";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../Shared/Heading";

const BannerList = () => {
  let filterUrl = "all";
  let url = `http://localhost:5000/allBanner/${filterUrl}`;

  const handleBannerFilter = (e) => {
    e.preventDefault();
    let newUrl = e.target.value;
    url = `http://localhost:5000/allBanner/${newUrl}`;

    refetch();
  };

  const {
    isLoading,
    error,
    data: bannerList,
    refetch,
  } = useQuery(["allBannerListData"], () => fetch(url).then((res) => res.json()));

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Heading>All Banner</Heading>
      <div class="overflow-x-auto w-full">
        <table class="table w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Banner info</th>
              <th className="flex items-center">
                <span> Action</span>
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
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            {bannerList?.map((bannerRow, index) => (
              <BannerListRow
                key={bannerRow?._id}
                bannerRow={bannerRow}
                index={index + 1}
                refetch={refetch}
              ></BannerListRow>
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

export default BannerList;

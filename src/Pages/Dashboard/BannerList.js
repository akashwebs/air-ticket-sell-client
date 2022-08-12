import React from "react";
import Loading from "../../Shared/Loading";
import BannerListRow from "./BannerListRow";
import { useQuery } from "@tanstack/react-query";

const BannerList = () => {
  const {
    isLoading,
    error,
    data: bannerList,
    refetch
  } = useQuery(["repoData"], () =>
    fetch("http://localhost:5000/allBanner/unhidefdf").then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Banner info</th>
            <th className="flex items-center">
              <span> Action</span>
              <form>
                <select class="select select-bordered w-full md:w-15 ml-2">
                  <option disabled selected>
                    Filter
                  </option>
                  <option>All Slider</option>
                  <option>Hide slider</option>
                  <option>Unhide slider</option>
                </select>
              </form>
            </th>
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
  );
};

export default BannerList;

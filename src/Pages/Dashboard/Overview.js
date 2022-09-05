import React from "react";
import Heading from "../../Shared/Heading";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";

const Overview = () => {
  // const {data:totalDonner, isLoading, reFeatch}=useQuery("totalDonner", ()=>fetch(''))

  const {
    data: allDonners,
    isLoading,
    refetch,
  } = useQuery(["allDonnerinoverviewpage"], () =>
    fetch("http://localhost:5000/allDonner-count").then((res) => res.json())
  );
  const {
    data: allRequest,
    isLoading: requestLoading,
    refetch: requestRefetch,
  } = useQuery(["allRequestinoverviewpage"], () =>
    fetch("http://localhost:5000/allRequest-count").then((res) => res.json())
  );

  if (isLoading || requestLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <Heading>Overview</Heading>
      <div className="flex">
        <div className="stats shadow mr-2">
          <div className="stat">
            <div className="stat-title">Total Donner</div>
            <div className="stat-value">{allDonners.lenght}</div>
          </div>
        </div>
        <div className="stats shadow mr-2">
          <div className="stat">
            <div className="stat-title">Donner Request</div>
            <div className="stat-value">{allRequest.lenght}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

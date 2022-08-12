import React from "react";
// import { useQuery } from 'react-query/build/cjs/packages/react-query/src';
import Heading from "../../Shared/Heading";
import SingleOverview from "./SingleOverview";

const Overview = () => {
  // const {data:totalDonner, isLoading, reFeatch}=useQuery("totalDonner", ()=>fetch(''))

  return (
    <div>
      <Heading>Overview</Heading>
      <SingleOverview
      // props={}
      ></SingleOverview>
    </div>
  );
};

export default Overview;

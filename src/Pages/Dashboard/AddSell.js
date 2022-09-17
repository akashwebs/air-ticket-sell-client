import React, { useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Heading from "../../Shared/Heading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import { toast } from "react-toastify";

const AddSell = () => {
  // current balance --------------------

  let balanceUrl = "http://localhost:5000/current-balance";
  const {
    isLoading,
    error,
    data: balance,
    refetch,
  } = useQuery(["current-blance"], () =>
    fetch(balanceUrl).then((res) => res.json())
  );

  const [startDate, setStartDate] = useState(new Date());
  const date = format(startDate, "PP");
  // ------------------------------------------------update curent balnce----------------------
  const hadleCurrentBalance = (e) => {
    e.preventDefault();
    const currentBalance = e.target.currentBalance.value;
    const balance = {
      currentBalance,
      email: "akash@gmail.com",
    };

    fetch("http://localhost:5000/add-current-balance/akash@gmail.com", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(balance),
    })
      .then((res) => res.json())
      .then((balance) => {
        console.log(balance);
        if (balance?.acknowledged) {
          swal("Successfully added", `current balance added`, "success");
          refetch();
          e.target.currentBalance.value = "";
        }
      });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const HandleAddSell = (data) => {
    const newCurrentBalance =
      parseFloat(balance.currentBalance) +
      parseFloat(data.drtaka) -
      parseFloat(data.crtaka);

    const sellInfo = {
      sl: data.sl,
      date: date,
      faxname: data.faxname,
      pnr: data.pnr,
      drtaka: data.drtaka,
      crtaka: data.crtaka,
      pyment: data.pyment,
      currentBalance: newCurrentBalance,
    };

    fetch("http://localhost:5000/add-sell", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sellInfo),
    })
      .then((res) => res.json())
      .then((sellInfo) => {
        if (sellInfo?.insertedId) {
          reset();
          swal("Successfully added", `${data?.faxname} added`, "success");

          // ----------------------update current balcne after add sell-------------------
          const balance = {
            currentBalance: newCurrentBalance,
            email: "akash@gmail.com",
          };

          fetch("http://localhost:5000/add-current-balance/akash@gmail.com", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(balance),
          })
            .then((res) => res.json())
            .then((balance) => {
              console.log(balance);
              if (balance?.acknowledged) {
                toast("closing balance updated ");
                refetch();
              }
            });
        }
      });
  };
  /* 
  if (isLoading) {
    return <Loading></Loading>;
  } */

  return (
    <div className="pb-8">
      <Heading>Add Current Balance</Heading>
      {/* --------------------------------------------------- */}
      <form onSubmit={hadleCurrentBalance} className="flex items-end gap-3">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Current Balance :{balance?.currentBalance}
            </span>
          </label>
          <input
            {...register("currentBalance")}
            type="number"
            placeholder="update current Balance"
            className="input input-bordered"
          />
        </div>
        <br />
        <input type="submit" value={"Submit"} className="btn btn-bordered " />
      </form>
      <br></br>
      <br></br>
      <br></br>
      {/* ---------------------------------------------------------- */}
      <Heading>Add Sell Balance</Heading>
      <form onSubmit={handleSubmit(HandleAddSell)}>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">S/L</span>
          </label>
          <input
            {...register("sl", { required: true })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">
              Date <small className="">(MM/DD/YYYY) formate</small>
            </span>
          </label>
          <DatePicker
            selected={startDate}
            className="input input-bordered w-full max-w-xs"
            onChange={(date) => setStartDate(date ? date : new Date())}
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Fax Name</span>
          </label>
          <input
            {...register("faxname")}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">PNR</span>
          </label>
          <input
            {...register("pnr")}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">DR Taka</span>
          </label>
          <input
            defaultValue={0}
            {...register("drtaka")}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">CR Taka</span>
          </label>
          <input
            defaultValue={0}
            {...register("crtaka")}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">
              Entry of <span className="text-red-400">*</span>
            </span>
          </label>
          <select
            {...register("pyment", { required: true })}
            className="select select-bordered"
          >
            <option hidden disabled selected>
              Select
            </option>
            <option value={"sell"}>Sell</option>
            <option value={"received"}>Cash Received</option>
          </select>
        </div>
        <br />
        <input
          type="submit"
          value={"Submit"}
          className="btn btn-bordered w-full max-w-md"
        />
      </form>
    </div>
  );
};

export default AddSell;

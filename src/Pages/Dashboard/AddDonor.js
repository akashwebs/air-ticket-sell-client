import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../Shared/Heading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import swal from "sweetalert";
import Loading from "../../Shared/Loading";

const AddDonor = () => {
  // setLoading(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  // const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const date = format(startDate, "PP");

  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageKey}`;

  const HandleAddDonor = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(imgUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const donor = {
            img: result?.data?.url,
            fullName: data.fullName,
            bloodGroup: data.bloodGroup,
            distric: data.distric,
            address: data.address,
            donationCount: data.donationCount,
            email: data.email,
            phone: data.phone,
            fbID: data.fbID,
            birthday: date,
            elegibale: data.elegibale,
            gender: data.gender,
            approved: true,
          };

          fetch("http://localhost:5000/addDonner", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(donor),
          })
            .then((res) => res.json())
            .then((donorResult) => {
              if (donorResult?.insertedId) {
                swal(
                  "Successfully added",
                  `${donor?.fullName} added`,
                  "success"
                );
                // setLoading(false);
                reset();
              }
            });
        }
      });
  };
  /* if (loading) {
    return <Loading></Loading>;
  } */
  return (
    <div className="pb-8">
      <Heading>Add Blood Donor</Heading>
      <form onSubmit={handleSubmit(HandleAddDonor)}>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">
              Full Name <span className="text-red-400">*</span>
            </span>
          </label>
          <input
            {...register("fullName", { required: true })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
          <label className="label">
            <span className="label-text-alt text-red-600">
              {" "}
              {errors.fullName?.type === "required" &&
                "name is required Ex: Akash Shil"}
            </span>
          </label>
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">
              Blood Group <span className="text-red-400">*</span>
            </span>
          </label>
          <select
            {...register("bloodGroup", { required: true })}
            className="select select-bordered"
          >
            <option disabled selected>
              Select
            </option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
          <label className="label">
            <span className="label-text-alt text-red-600">
              {" "}
              {errors.bloodGroup?.type === "required" &&
                "please Select any blood group"}
            </span>
          </label>
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Full Address </span>
          </label>
          <input
            {...register("address")}
            type="text"
            placeholder="ex: nawla/rahimanagar/kachua"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">
              Distric <span className="text-red-400">*</span>
            </span>
          </label>
          <select
            {...register("distric", { required: true })}
            className="select select-bordered"
          >
            <option disabled selected>
              Select Distric
            </option>
            <option>Dhaka</option>
            <option>Faridpur</option>
            <option>Gazipur</option>
            <option>Gopalganj</option>
            <option>Jamalpur</option>
            <option>Kishoreganj</option>
            <option>Madaripur</option>
            <option>Manikganj</option>
            <option>Munshiganj</option>
            <option>Mymensingh</option>
            <option>Narayanganj</option>
            <option>Narsingdi</option>
            <option>Netrokona</option>
            <option>Rajbari</option>
            <option>Shariatpur</option>
            <option>Sherpur</option>
            <option>Tangail</option>
            <option>Bogra</option>
            <option>Joypurhat</option>
            <option>Naogaon</option>
            <option>Natore</option>
            <option>Nawabganj</option>
            <option>Pabna</option>
            <option>Rajshahi</option>
            <option>Sirajgonj</option>
            <option>Dinajpur</option>
            <option>Gaibandha</option>
            <option>Kurigram</option>
            <option>Lalmonirhat</option>
            <option>Nilphamari</option>
            <option>Panchagarh</option>
            <option>Rangpur</option>
            <option>Thakurgaon</option>
            <option>Barguna</option>
            <option>Barisal</option>
            <option>Bhola</option>
            <option>Jhalokati</option>
            <option>Patuakhali</option>
            <option>Pirojpur</option>
            <option>Bandarban</option>
            <option>Brahmanbaria</option>
            <option>Chandpur</option>
            <option>Chittagong</option>
            <option>Comilla</option>
            <option>Cox</option>''s Bazar
            <option>Feni</option>
            <option>Khagrachari</option>
            <option>Lakshmipur</option>
            <option>Noakhali</option>
            <option>Rangamati</option>
            <option>Habiganj</option>
            <option>Maulvibazar</option>
            <option>Sunamganj</option>
            <option>Sylhet</option>
            <option>Bagerhat</option>
            <option>Chuadanga</option>
            <option>Jessore</option>
            <option>Jhenaidah</option>
            <option>Khulna</option>
            <option>Kushtia</option>
            <option>Magura</option>
            <option>Meherpur</option>
            <option>Narail</option>
            <option>Satkhira</option>
          </select>
          <label className="label">
            <span className="label-text-alt text-red-600">
              {" "}
              {errors.distric?.type === "required" &&
                "please Select any blood group"}
            </span>
          </label>
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Birthday Date</span>
          </label>

          <DatePicker
            className="input input-bordered w-full max-w-xs"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">
              Phone Number <span className="text-red-400">*</span>
            </span>
          </label>

          <input
            {...register("phone", { required: true })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Email Address</span>
          </label>

          <input
            type="email"
            {...register("email")}
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        {/* after */}
        <div className="form-control w-full max-w-sm">
          <label className="label">
            <span className="label-text">
              Gender <span className="text-red-400">*</span>
            </span>
          </label>
          <select
            {...register("gender", { required: true })}
            className="select select-bordered"
          >
            <option disabled selected>
              Select gender
            </option>
            <option>male</option>
            <option>female</option>
          </select>
          <label className="label">
            <span className="label-text-alt text-red-600">
              {errors.gender?.type === "required" &&
                "please Select any gender "}
            </span>
          </label>
        </div>
        <div className="form-control w-full max-w-sm">
          <label className="label">
            <span className="label-text">
              Elegibale <span className="text-red-400">*</span>
            </span>
          </label>
          <select
            {...register("elegibale", { required: true })}
            className="select select-bordered"
          >
            <option disabled selected>
              Select
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
          <label className="label">
            <span className="label-text-alt text-red-600">
              {errors.elegibale?.type === "required" && "please Select yes/no"}
            </span>
          </label>
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">কতবার রক্ত দিয়েছেন?</span>
          </label>

          <input
            type="number"
            {...register("donationCount")}
            placeholder="Type Number"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Facebook Id profile URL</span>
          </label>

          <input
            type="text"
            {...register("fbID")}
            placeholder="please copy/paste fb url"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">
              Donor Photo{" "}
              <small className="font-bold text-green-500">
                (Photo size less then 700kb){" "}
              </small>
            </span>
          </label>

          <input
            {...register("image")}
            type="file"
            className="input input-bordered mb-3 w-full "
          />
        </div>

        <input
          type="submit"
          value={"Submit"}
          className="btn btn-bordered w-full max-w-md"
        />
      </form>
    </div>
  );
};

export default AddDonor;

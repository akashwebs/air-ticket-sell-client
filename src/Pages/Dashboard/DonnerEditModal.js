import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import swal from "sweetalert";
import Loading from "../../Shared/Loading";
import { toast } from "react-toastify";

const DonnerEditModal = ({ donner, refetch }) => {
  const [startDate, setStartDate] = useState(new Date());
  const date = format(startDate, "PP");

  const [address, setaddress] = useState(null);
  const [birthday, setbirthday] = useState(null);
  const [bloodGroup, setbloodGroup] = useState(null);
  const [distric, setdistric] = useState(null);
  const [donationCount, setdonationCount] = useState(null);
  const [elegibale, setelegibale] = useState(null);
  const [email, setemail] = useState(null);
  const [fbID, setfbID] = useState(null);
  const [fullName, setfullName] = useState(null);
  const [img, setimg] = useState(null);
  const [phone, setphone] = useState(null);
  const [gender, setgender] = useState(null);
  const [lastDonationDate, setlastDonationDate] = useState(null);

  useEffect(() => {
    setaddress(donner.address);
    setbirthday(donner.birthday);
    setbloodGroup(donner.bloodGroup);
    setdistric(donner.distric);
    setdonationCount(donner.donationCount);
    setelegibale(donner.elegibale);
    setemail(donner.email);
    setfbID(donner.fbID);
    setfullName(donner.fullName);
    setimg(donner.img);
    setphone(donner.phone);
    setlastDonationDate(donner.lastDonationDate);
    setgender(donner.gender);

    if (birthday) {
      return setStartDate(new Date(birthday));
    }
    setStartDate(new Date());
  }, [donner]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageKey}`;

  const HandleUpdateProfilePhoto = (data) => {
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
          const photo = {
            img: result?.data?.url,
          };

          fetch(
            `https://rokto-bondon-server.vercel.app/updateProfile/${donner._id}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(photo),
            }
          )
            .then((res) => res.json())
            .then((photo) => {
              console.log(photo);
              if (photo?.modifiedCount) {
                toast.success("profile updated");
              }
            });
        }
      });
  };
  const HandleUpdateProfile = (data) => {
    const updateDonner = {
      fullName,
      bloodGroup,
      distric,
      address,
      donationCount,
      email,
      phone,
      fbID,
      birthday: date,
      elegibale,
      gender,
      lastDonationDate,
      approved: true,
    };
    console.log(updateDonner);

    fetch(
      `https://rokto-bondon-server.vercel.app/updateProfile/${donner?._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateDonner),
      }
    )
      .then((res) => res.json())
      .then((profile) => {
        if (profile?.modifiedCount) {
          toast.success("profile updated");
          refetch();
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="donner_edit_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-2/3 md:w-2/4 sm:modal-middle max-w-5xl">
          <label
            htmlFor="donner_edit_modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">Update Profile</h3>
          <span className="divider mt-1"></span>

          <form onSubmit={handleSubmit(HandleUpdateProfile)}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <div className="form-control w-full max-w-sm">
                  <label className="label">
                    <span className="label-text">
                      Full Name <span className="text-red-400">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered w-full max-w-sm"
                    value={fullName}
                    onChange={(e) => setfullName(e.target.value)}
                  />
                  <label className="label">
                    <span className="label-text-alt text-red-600">
                      {errors.fullName?.type === "required" &&
                        "name is required Ex: Akash Shil"}
                    </span>
                  </label>
                </div>

                <div className="form-control w-full max-w-sm">
                  <label className="label">
                    <span className="label-text">
                      Blood Group <span className="text-red-400">*</span>{" "}
                    </span>
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setbloodGroup(e.target.value)}
                    className="select select-bordered"
                  >
                    <option selected hidden>
                      select
                    </option>
                    <option value={"A+"}>A+</option>
                    <option value={"A-"}>A-</option>
                    <option value={"B+"}>B+</option>
                    <option value={"B-"}>B-</option>
                    <option value={"AB+"}>AB+</option>
                    <option value={"AB-"}>AB-</option>
                    <option value={"O+"}>O+</option>
                    <option value={"O-"}>O-</option>
                  </select>
                  <label className="label">
                    <span className="label-text-alt text-red-600">
                      {errors.bloodGroup?.type === "required" &&
                        "please Select any blood group"}
                    </span>
                  </label>
                </div>

                <div className="form-control w-full max-w-sm">
                  <label className="label">
                    <span className="label-text">Full Address </span>
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-sm"
                  />
                </div>

                <div className="form-control w-full max-w-sm">
                  <label className="label">
                    <span className="label-text">
                      Distric <span className="text-red-400">*</span>
                    </span>
                  </label>
                  <select
                    value={distric}
                    onChange={(e) => setdistric(e.target.value)}
                    className="select select-bordered"
                  >
                    <option selected hidden>
                      select
                    </option>
                    <option value={"Dhaka"}>Dhaka</option>
                    <option value={"Faridpur"}>Faridpur</option>
                    <option value={"Gazipur"}>Gazipur</option>
                    <option value={"Gopalganj"}>Gopalganj</option>
                    <option value={"Jamalpur"}>Jamalpur</option>
                    <option value={"Kishoreganj"}>Kishoreganj</option>
                    <option value={"Madaripur"}>Madaripur</option>
                    <option value={"Manikganj"}>Manikganj</option>
                    <option value={"Munshiganj"}>Munshiganj</option>
                    <option value={"Mymensingh"}>Mymensingh</option>
                    <option value={"Narayanganj"}>Narayanganj</option>
                    <option value={"Narsingdi"}>Narsingdi</option>
                    <option value={"Netrokona"}>Netrokona</option>
                    <option value={"Rajbari"}>Rajbari</option>
                    <option value={"Shariatpur"}>Shariatpur</option>
                    <option value={"Sherpur"}>Sherpur</option>
                    <option value={"Tangail"}>Tangail</option>
                    <option value={"Bogra"}>Bogra</option>
                    <option value={"Joypurhat"}>Joypurhat</option>
                    <option value={"Naogaon"}>Naogaon</option>
                    <option value={"Natore"}>Natore</option>
                    <option value={"Nawabganj"}>Nawabganj</option>
                    <option value={"Pabna"}>Pabna</option>
                    <option value={"Rajshahi"}>Rajshahi</option>
                    <option value={"Sirajgonj"}>Sirajgonj</option>
                    <option value={"Dinajpur"}>Dinajpur</option>
                    <option value={"Gaibandha"}>Gaibandha</option>
                    <option value={"Kurigram"}>Kurigram</option>
                    <option value={"Lalmonirhat"}>Lalmonirhat</option>
                    <option value={"Nilphamari"}>Nilphamari</option>
                    <option value={"Panchagarh"}>Panchagarh</option>
                    <option value={"Rangpur"}>Rangpur</option>
                    <option value={"Thakurgaon"}>Thakurgaon</option>
                    <option value={"Barguna"}>Barguna</option>
                    <option value={"Barisal"}>Barisal</option>
                    <option value={"Bhola"}>Bhola</option>
                    <option value={"Jhalokati"}>Jhalokati</option>
                    <option value={"Patuakhali"}>Patuakhali</option>
                    <option value={"Pirojpur"}>Pirojpur</option>
                    <option value={"Bandarban"}>Bandarban</option>
                    <option value={"Brahmanbaria"}>Brahmanbaria</option>
                    <option value={"Chandpur"}>Chandpur</option>
                    <option value={"Chittagong"}>Chittagong</option>
                    <option value={"Comilla"}>Comilla</option>
                    <option value={"Cox"}>Cox</option>''s Bazar
                    <option value={"Feni"}>Feni</option>
                    <option value={"Khagrachari"}>Khagrachari</option>
                    <option value={"Lakshmipur"}>Lakshmipur</option>
                    <option value={"Noakhali"}>Noakhali</option>
                    <option value={"Rangamati"}>Rangamati</option>
                    <option value={"Habiganj"}>Habiganj</option>
                    <option value={"Maulvibazar"}>Maulvibazar</option>
                    <option value={"Sunamganj"}>Sunamganj</option>
                    <option value={"Sylhet"}>Sylhet</option>
                    <option value={"Bagerhat"}>Bagerhat</option>
                    <option value={"Chuadanga"}>Chuadanga</option>
                    <option value={"Jessore"}>Jessore</option>
                    <option value={"Jhenaidah"}>Jhenaidah</option>
                    <option value={"Khulna"}>Khulna</option>
                    <option value={"Kushtia"}>Kushtia</option>
                    <option value={"Magura"}>Magura</option>
                    <option value={"Meherpur"}>Meherpur</option>
                    <option value={"Narail"}>Narail</option>
                    <option value={"Satkhira"}>Satkhira</option>
                  </select>
                </div>

                <div className="form-control w-full max-w-sm">
                  <label className="label">
                    <span className="label-text">
                      Elegibale <span className="text-red-400">*</span>
                    </span>
                  </label>
                  <select
                    value={elegibale}
                    onChange={(e) => setelegibale(e.target.value)}
                    className="select select-bordered"
                  >
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </select>
                </div>

                <div className="form-control w-full max-w-sm">
                  <label className="label">
                    <span className="label-text">
                      Last Donation Date{" "}
                      <span className="text-sm">"DD/MM/YYYY"</span>
                    </span>
                  </label>
                  <input
                    value={lastDonationDate}
                    onChange={(e) => setlastDonationDate(e.target.value)}
                    type="text"
                    placeholder="MM/DD/YYYY"
                    className="input input-bordered w-full max-w-sm"
                  />
                </div>
              </div>
              {/* second div */}

              <div>
                <div className="form-control w-full max-w-sm">
                  <label className="label">
                    <span className="label-text">
                      Gender <span className="text-red-400">*</span>
                    </span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                    className="select select-bordered"
                  >
                    <option selected hidden>
                      select
                    </option>
                    <option value={"male"}>male</option>
                    <option value={"female"}>female</option>
                  </select>
                </div>
                <div className="form-control w-full max-w-sm">
                  <label className="label">
                    <span className="label-text">Birthday Date: </span>
                  </label>

                  <DatePicker
                    selected={startDate}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(date) => setStartDate(date ? date : new Date())}
                    showYearDropdown
                    scrollableMonthYearDropdown
                  />
                </div>

                <div className="form-control w-full max-w-sm mt-3">
                  <label className="label">
                    <span className="label-text">
                      Phone Number <span className="text-red-400">*</span>
                    </span>
                  </label>

                  <input
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-sm"
                  />
                </div>

                <div className="form-control w-full max-w-sm  mt-3">
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>

                  <input
                    value={email}
                    disabled
                    type="email"
                    {...register("email")}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-sm"
                  />
                </div>

                <div className="form-control w-full max-w-md  mt-3">
                  <label className="label">
                    <span className="label-text">কতবার রক্ত দিয়েছেন?</span>
                  </label>

                  <input
                    value={donationCount}
                    onChange={(e) => setdonationCount(e.target.value)}
                    type="number"
                    placeholder="Type Number"
                    className="input input-bordered w-full max-w-md"
                  />
                </div>
                <div className="form-control w-full max-w-md  mt-3">
                  <label className="label">
                    <span className="label-text">Facebook Id profile URL</span>
                  </label>

                  <input
                    value={fbID}
                    onChange={(e) => setfbID(e.target.value)}
                    type="text"
                    placeholder="please copy/paste fb url"
                    className="input input-bordered w-full max-w-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <input
                type={"submit"}
                value="Update profile"
                className="btn btn-success w-full text-white mt-3"
              />
            </div>
          </form>

          <div className="mt-5">
            {/* for image update form */}
            <h3 className="font-bold text-lg">Update Profile Photo</h3>
            <span className="divider my-1"></span>
            <form onSubmit={handleSubmit(HandleUpdateProfilePhoto)}>
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">
                    Donor Photo
                    <small className="font-bold text-green-500">
                      (Photo size less then 700kb)
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
                type={"submit"}
                value="update photo"
                className="btn btn-success text-white"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonnerEditModal;

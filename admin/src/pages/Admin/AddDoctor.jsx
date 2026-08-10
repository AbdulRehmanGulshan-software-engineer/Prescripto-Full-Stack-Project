import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  //state variable to store the image file
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async () => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      // created form data
      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 }),
      );

      // console log formdata
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          // i am header
          headers: { aToken },
        },
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border border-gray-200 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        {/* Image */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-16 h-16 object-cover bg-gray-100 rounded-full"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload doctor"
            />
          </label>

          <input
            onChange={(e) => {
              setDocImg(e.target.files[0]);
            }}
            type="file"
            id="doc-img"
            hidden
          />

          <p className="text-sm leading-5">
            Upload doctor
            <br />
            picture
          </p>
        </div>

        {/* Details */}
        <div className="flex flex-col lg:flex-row items-start gap-8 text-gray-600">
          {/* Left */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <p className="text-sm">Doctor name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-gray-400 transition"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-sm">Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-gray-400 transition"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-sm">Doctor password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-gray-400 transition"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-sm">Doctor experience</p>
              <select
                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-gray-400 transition bg-white"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-sm">Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-gray-400 transition"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          {/* Right */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <p className="text-sm">Speciality</p>
              <select
                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-gray-400 transition bg-white"
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-sm">Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-gray-400 transition"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-sm">Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-gray-400 transition"
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-gray-400 transition"
                type="text"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-1.5">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-gray-400 transition resize-none"
            placeholder="Write about doctor"
            required
            rows={5}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 bg-primary px-10 py-3 text-white text-sm rounded-full hover:opacity-90 transition"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;

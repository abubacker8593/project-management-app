import React, { useState } from "react";
import NavBar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import Default from "../assets/profile.avif";
import { toast } from "react-toastify";
import { updateuser } from "../redux/features/authslice";
import { RiEjectFill } from "react-icons/ri";

function Profile() {
  let { user } = useSelector((state) =>  state.auth);
  let [editing, setediting] = useState(false);
  let [image, setimage] = useState(false);
  let dispatch = useDispatch()

  let [data, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    job: "",
    website : "",
  });
  if (!user) {
        return <div>Loading...</div>;
    }
  function handlechange(e) {
    
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  function handleEdit() {
    setdata({
        id: user.id,
        name: user.name ? user.name: "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
        job: user.job || "",
        website: user.website || "",
    });
    console.log('i was here')

    setediting(true);
}
  async function handlesubmit(e) {
    e.preventDefault();
        if (!data.name.trim()) {
        toast.error("Name is required");
        return;
      }
    
      if (!data.email.trim()) {
        toast.error("Email is required");
        return;
      }
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
      if (!emailRegex.test(data.email)) {
        toast.error("Enter a valid email");
        console.log('enter valid email')
        return;
      }
    if(!data.phone.trim() || !data.bio.trim() || !data.job.trim() || !data.location.trim() || !data.website.trim()){
       toast.error("please fill in all the field");
       
      return;
    }
    try{
      console.log(data)
      await dispatch(updateuser(data)).unwrap()
      toast("updated succefully")
      setediting(false)
    }catch(err){
      toast.error(err)
    }
  }
  function handleimage(e) {
    console.log(e.target);
  }
  return (
    <div>
      <NavBar></NavBar>
      <div className="h-screen w-screen dark:bg-black bg-gray-200  dark:text-white text-black">
        <h1 className="top-0">Profile</h1>
        <div className="flex flex-col  items-center justify-center">
          <div className="flex gap-10">
            <div>
              <img
                src={user.profile ? user.profile : Default}
                alt=""
                className="size-20 rounded-full"
              />
              {image ? (
                <input
                  type="file"
                  name="profile"
                  accept="image/*"
                  onChange={handleimage}
                />
              ) : (
                ""
              )}
            </div>
            <div>
              <h1>{user.name}</h1>
              <h1>{user.email}</h1>
              <button
                className="cursor-pointer"
                onClick={() => setimage(!image)}
              >
                Change profile
              </button>
            </div>
          </div>
          <form onSubmit={handlesubmit}>
            <div className="border px-2 py-3 mt-3">
              <h1>Personal information</h1>

              <div className="flex gap-3">
                <label>Fullname:</label>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handlechange}
                    placeholder={user.name}
                  />
                ) : (
                  <h1>{user.name}</h1>
                )}
              </div>

              <div className="flex gap-3">
                <label>Email:</label>

                {editing ? (
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handlechange}
                    placeholder={user.email}
                  />
                ) : (
                  <h1>{user.email}</h1>
                )}
              </div>

              <div className="flex gap-3">
                <label>Phone:</label>

                {editing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={handlechange}
                    placeholder={user.phone || "Your phone number"}
                  />
                ) : (
                  <h1>{user.phone || "Your phone number"}</h1>
                )}
              </div>

              <div className="flex gap-3">
                <label>Bio:</label>

                {editing ? (
                  <input
                    type="text"
                    name="bio"
                    value={data.bio}
                    onChange={handlechange}
                    placeholder={user.bio || "Describe yourself"}
                  />
                ) : (
                  <h1>{user.bio || "Describe yourself"}</h1>
                )}
              </div>
            </div>

            <div className="border px-2 py-3">
              <h1>Additional information</h1>

              <div className="flex gap-3">
                <label>Location:</label>

                {editing ? (
                  <input
                    type="text"
                    name="location"
                    value={data.location}
                    onChange={handlechange}
                    placeholder={user.location || "Your location"}
                  />
                ) : (
                  <h1>{user.location || "Your location"}</h1>
                )}
              </div>

              <div className="flex gap-3">
                <label>Job title:</label>

                {editing ? (
                  <input
                    type="text"
                    name="job"
                    value={data.job}
                    onChange={handlechange}
                    placeholder={user.job || "Your role"}
                  />
                ) : (
                  <h1>{user.job || "Your role"}</h1>
                )}
              </div>

              <div className="flex gap-3">
                <label>Website:</label>

                {editing ? (
                  <input
                    type="text"
                    name="website"
                    value={data.website}
                    onChange={handlechange}
                    placeholder={user.website || "Your website"}
                  />
                ) : (
                  <h1>{user.website || "Your website"}</h1>
                )}
              </div>
            </div>
            <div>
              {editing ? (
                <button type="submit">Save Changes</button>
              ) : (
                <button type="button" onClick={handleEdit}>
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;

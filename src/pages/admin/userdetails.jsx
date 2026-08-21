import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getuserdetails,
  updateUserStatus,
} from "../../redux/features/adminslice";
import { toast } from "react-toastify";
import NavBar from "../../components/navbar";
import { FaRightToBracket } from "react-icons/fa6";
import { FcPrevious } from "react-icons/fc";

function UserDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const res = await dispatch(getuserdetails(id)).unwrap();

        setUser(res);

        console.log("user details:", res);
      } catch (err) {
        toast.error(err?.message || "Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [dispatch, id]);
  const handleStatusChange = async () => {
    try {
      const res = await dispatch(
        updateUserStatus({
          id,
          active: !user.active,
        }),
      ).unwrap();

      setUser(res);

      toast.success(res.active ? "User activated" : "User deactivated");
    } catch (err) {
      toast.error("Failed to update user status");
    }
  };

  if (loading) {
    return <div className="p-4 dark:bg-black dark:text-white">Loading...</div>;
  }

  return (
    <div>
      <NavBar></NavBar>
      <div className="p-4 dark:bg-black dark:text-white h-screen w-screen flex items-center flex-col">
        <div className="flex items-center mb-4 w-screen">
          <FcPrevious
            className="size-7 cursor-pointer"
            onClick={() => {
              navigate("/admin");
            }}
          />
       </div>
        {user && (
          <div className="flex flex-col items-center justify-center bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md w-[90%] max-w-md">
            <div className="mt-4">
              <img
                src={user.profile}
                alt={user.name}
                className="size-30 rounded-full"
              />
            </div>
            <h1 className="text-2xl font-bold">{user.name}</h1>

            <p>{user.email}</p>
            <p>Role: {user.role}</p>
            <p>bio : {user.bio}</p>
            {user.active ? (
              <div className="flex flex-col items-center">
                <p className="text-green-500">Active</p>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4 cursor-pointer"
                  onClick={() => handleStatusChange()}
                  type="button"
                >
                  Deactivate User
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-red-500">Inactive</p>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4 cursor-pointer"
                  onClick={() => handleStatusChange()}
                  type="button"
                >
                  Activate User
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetails;

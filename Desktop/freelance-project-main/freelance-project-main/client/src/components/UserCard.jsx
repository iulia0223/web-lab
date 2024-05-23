import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { MdDeleteForever, MdEditDocument } from "react-icons/md";

import { userService } from "../services/userService";

import { useProfileStore } from "../store/userStore";
import { toast } from "react-toastify";

const selectOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "USER", label: "User" },
];

const UserCard = ({ user, revalidateFn }) => {
  const errorToast = (message) => toast.error(message);
  const { token } = useProfileStore();

  const selectRef = useRef();

  const [userRole, setUserRole] = useState();

  const updateUserRole = async (newRole) => {
    try {
      await userService.update(user._id, { role: newRole });
      revalidateFn();
    } catch (error) {
      errorToast("Error updating user role");
    }
  };

  useEffect(() => {
    setUserRole(user.role);
  }, [user.role]);

  return (
    <div className="bg-gray-300 flex flex-col gap-3 p-4 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <h3>
            Username: <strong>{user.username}</strong>
          </h3>
        </div>
        <div>
          <h3>Current role: {userRole}</h3>
          <select
            ref={selectRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
            value={userRole}
            onChange={async (e) => {
              setUserRole(e.target.value);
              await updateUserRole(e.target.value);
            }}
          >
            {selectOptions.map((option) => (
              <option
                key={option.value}
                disabled={user.role === option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2.5">
          <div
            className="bg-blue-600 h-7 w-7 rounded-lg grid place-content-center text-white cursor-pointer"
            onClick={() => selectRef.current.focus()}
          >
            <MdEditDocument />
          </div>
          <div
            className="bg-red-600 h-7 w-7 rounded-lg grid place-content-center text-white cursor-pointer"
            onClick={async () => {
              try {
                const { status } = await userService.delete(user._id, token);
                if (status === 200) {
                  revalidateFn();
                } else {
                  toast.error("You're are not ADMIN, you can't delete users.");
                }
              } catch (error) {
                toast.error("Something went wrong. Please try again.");
              }
            }}
          >
            <MdDeleteForever />
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
  revalidateFn: PropTypes.func.isRequired,
};

export default UserCard;

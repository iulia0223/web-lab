import { useEffect, useState } from "react";

import userService from "../services/userService";

import UserCard from "./UserCard";
import { useSocketStore } from "../store/socketStore";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revalidateCounter, setRevalidateCounter] = useState(0);

  const { socket } = useSocketStore();

  useEffect(() => {
    if (socket) {
      socket.on("room joined", () => {
        setRevalidateCounter((prevState) => prevState + 1);
      });
    }

    return () => {
      if (socket) {
        socket.off("room joined");
      }
    };
  }, [socket]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const users = await userService.getAll();

      setUsers(users.data);
    } catch (error) {
      throw new Error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [revalidateCounter]);

  if (isLoading) {
    return (
      <div className="bg-gray-200  w-full grid place-content-center">
        <h1 className="text-4xl h-28 grid place-content-center">Fetching...</h1>
      </div>
    );
  }

  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.length > 0 ? (
        users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            revalidateFn={() =>
              setRevalidateCounter((prevState) => prevState + 1)
            }
          />
        ))
      ) : (
        <h1 className="text-2xl text-center col-[1/-1]">No users found</h1>
      )}
    </div>
  );
};

export default UserList;

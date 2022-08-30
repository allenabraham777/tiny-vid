import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="lg:border-b-2 border-gray-200 p-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Suggested Accounts
      </p>
      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={`${user._id}`}>
            <div className="flex gap-3 hover:bg-primary p-2 justify-center md:justify-start cursor-pointer font-semibold rounded">
              <div className="w-8 h-8">
                <Image
                  src={user.image}
                  className="rounded-full"
                  alt="user-profile"
                  height={32}
                  width={32}
                  layout="fixed"
                />
              </div>
              <div className="hidden xl:block">
                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                  {user.userName.replaceAll(" ", "")}{" "}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="text-xs font-bold text-gray-400 capitalize">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;

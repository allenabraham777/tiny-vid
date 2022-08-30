import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import NoResults from "./NoResults";

interface Props {
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  _key: string;
  postedBy: {
    _id: any;
    _ref: string;
  };
}

const Comments = ({
  isPostingComment,
  comment,
  setComment,
  addComment,
  comments,
}: Props) => {
  const { userProfile, allUsers }: any = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          comments.map((item, index) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center lg:last:mb-20" key={index}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={34}
                              height={34}
                              className="rounded-full"
                              alt="user-profile"
                              layout="responsive"
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
                      <div className="py-5">
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="No comments yet! Be the first one to comment." />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 px-2 md:px-10  w-full bg-white">
          <form onSubmit={addComment} className="flex gap-4 p-3 items-center">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Comment"
              className="bg-primary px-6 py-4 text-medium font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-200 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400" onClick={addComment}>
              {isPostingComment ? "Commenting...." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;

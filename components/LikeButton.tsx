import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";

interface Props {
  handleLikeDislike: (like: boolean) => void;
  likes: any[];
}

const LikeButton = ({ handleLikeDislike, likes }: Props) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [likes, filterLikes]);

  return (
    <div className="gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        <div
          className={`bg-primary rounded-full p-2 md:p-4 ${
            alreadyLiked ? "primary-text" : ""
          }`}
          onClick={() => handleLikeDislike(!alreadyLiked)}
        >
          <MdFavorite className="text-lg md:text-2xl" />
        </div>
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;

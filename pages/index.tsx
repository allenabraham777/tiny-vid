import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { BASE_URL } from "../utils";

interface Props {
  videos: Video[];
}

const Home = ({ videos }: Props) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text={"No Videos"} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let url = "";
  if (topic) {
    url = `${BASE_URL}/api/discover/${topic}`;
  } else {
    url = `${BASE_URL}/api/post`;
  }
  const { data } = await axios.get(url);
  return {
    props: {
      videos: data,
    },
  };
};

export default Home;

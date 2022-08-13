import Image from "next/image";
import Banner from "./Heading";
import { useMoralis } from "react-moralis";
import { AiTwotoneEdit } from "react-icons/ai";
import TweetFeed from "./TweetFeed";

const Profile = () => {
  const { user } = useMoralis();
  const username = user?.getUsername();
  const bio = user?.get("bio");
  const pft: string = user?.get("pft");
  const banner: string = user?.get("banner");
  return (
    <div className="w-full p-2">
      <Banner title={"Profile"} />
      <div className="border-y border-y-gray-800 mt-5 p-5">
        <div>
          <Image
            src={banner || "/defaultBanner.png"}
            width={1000}
            height={200}
            objectFit="cover"
            layout="responsive"
            alt=""
            className="rounded"
            placeholder="blur"
            // loading="lazy"
            blurDataURL={banner || "/defaultBanner.png"}
          />
          <div className="-translate-y-8 ring max-w-max max-h-max rounded-full flex translate-x-5">
            <Image
              src={pft || "/1.jpg"}
              width={50}
              height={50}
              alt=""
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="translate-x-24 -translate-y-9">
            <p className="text-gray-200">{username}</p>
            <p className="text-gray-400">{bio || "-"}</p>
          </div>
          <AiTwotoneEdit
            size="3rem"
            className="bg-cyan-500 p-2 rounded-full cursor-pointer"
          />
        </div>
      </div>
      <TweetFeed profile={user?.attributes.solAddress} />
    </div>
  );
};

export default Profile;

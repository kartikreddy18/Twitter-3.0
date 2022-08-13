import { Moralis } from "moralis/types/node";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

type InitialProps = {
  profile: string;
};

const TweetFeed = ({ profile }: InitialProps) => {
  const { Moralis, user } = useMoralis();
  const [tweets, setTweets] = useState<Moralis.Object<Moralis.Attributes>[]>(
    []
  );
  useEffect(() => {
    const fetch = async () => {
      try {
        const Tweets = Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Tweets);
        if (profile) {
          query.equalTo("account", profile);
        }
        const tweets = await query.find();
        setTweets(tweets);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [profile, Moralis.Query, Moralis.Object]);
  return (
    <div className="mt-2">
      <div className="flex justify-center">
        <h2 className="text-cyan-500 font-semibold text-lg max-w-max border-b-4 border-b-cyan-500 rounded-b ">
          Tweets
        </h2>
      </div>
      <div className="">
        {tweets &&
          tweets
            .map((tweet, index) => (
              <div key={index} className="p-5">
                <div className="flex items-center space-x-5">
                  <Image
                    src={tweet.attributes.pft}
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-full"
                  />
                  <div className="flex justify-between w-full">
                    <div className="text-gray-300 flex space-x-2 items-center">
                      <p>{tweet.attributes.username}</p>
                      <p className="text-gray-500">{user?.attributes.bio}</p>
                    </div>
                    <p className="text-lg">
                      {tweet.attributes.sentiment === "Positive"
                        ? "😊"
                        : tweet.attributes.sentiment === "Negative"
                        ? "😟"
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray-200 pl-10 mb-3">
                    {tweet.attributes.tweetTxt}
                  </p>
                  {tweet.attributes.tweetImg && (
                    <Image
                      src={tweet.attributes.tweetImg}
                      width={1000}
                      height={800}
                      alt=""
                    />
                  )}
                </div>
              </div>
            ))
            .reverse()}
      </div>
    </div>
  );
};

export default TweetFeed;

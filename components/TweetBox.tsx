import Image from "next/image";
import { useRef, useState, useCallback, ChangeEvent } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { SiBlockchaindotcom } from "react-icons/si";
import { useMoralis } from "react-moralis";

const TweetBox = () => {
  const [tweet, setTweet] = useState("");
  const [image, setImage] = useState("");
  const TweetImg = useRef<HTMLInputElement>(null);
  const handleClick = useCallback(() => {
    TweetImg.current?.click();
  }, []);
  const { user } = useMoralis();
  const profileImage = user?.get("pft");
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const img = URL.createObjectURL(event.target.files[0]);
      setImage(img);
    }
  }, []);
  const handleTweet = () => {
    // Normal Moralis Tweet
  };
  return (
    <div className="border-y mt-5 p-2 pt-5 border-gray-800">
      <div className="flex items-center space-x-5">
        <Image
          src={profileImage || "/1.jpg"}
          width={50}
          height={50}
          alt=""
          className="rounded-full"
          objectFit="contain"
        />
        <input
          type="text"
          className="flex-1 p-2 rounded border-none outline-none bg-transparent font-semibold placeholder-gray-500 text-gray-300"
          placeholder="What's happening?"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        />
      </div>
      <div className="px-10 py-5 flex items-center justify-between">
        <div className="cursor-pointer" onClick={handleClick}>
          <BsFillImageFill
            size="1.2rem"
            className="text-cyan-500 hover:text-cyan-400"
          />
          <input
            type="file"
            className="hidden"
            ref={TweetImg}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="flex space-x-3 font-bold">
          <button
            className="bg-cyan-500 px-5 rounded-full hover:bg-cyan-400"
            onClick={handleTweet}
          >
            Tweet
          </button>
          <button
            className="bg-cyan-500 p-4 rounded-full hover:bg-cyan-400"
            onClick={() => ""}
          >
            <SiBlockchaindotcom size="1.2rem" />
          </button>
        </div>
      </div>
      <div className="p-2">
        {image && (
          <Image
            src={image}
            width={1000}
            height={300}
            objectFit="contain"
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default TweetBox;

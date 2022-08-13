import Image from "next/image";
import { useRef, useState, useCallback, ChangeEvent } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { SiBlockchaindotcom } from "react-icons/si";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

import idl from "../idl/idl.json";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, web3, AnchorProvider } from "@project-serum/anchor";

declare global {
  interface Window {
    solana: any;
  }
}

const TweetBox = () => {
  const { reload } = useRouter();
  const { user, Moralis } = useMoralis();
  const [tweet, setTweet] = useState("");
  const [image, setImage] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const TweetImg = useRef<HTMLInputElement>(null);
  const handleClick = useCallback(() => {
    TweetImg.current?.click();
  }, []);
  const profileImage = user?.get("pft");
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setImageFile(file);
      const img = URL.createObjectURL(file);
      setImage(img);
    }
  }, []);

  const programID = new PublicKey(
    "EB13JK1AT5Bi9TNmy744GGaUxYztZ47CG1Pr1xo8WXPy"
  );
  const network = clusterApiUrl("devnet");

  const getProvider = () => {
    const connection = new Connection(network, "processed");
    if (typeof window !== "undefined") {
      const provider = new AnchorProvider(connection, window.solana, {
        preflightCommitment: "processed",
      });
      return provider;
    }
    return;
  };

  const provider = getProvider();
  const program = new Program(idl, programID, provider);
  type Tweet = {
    text: string;
    image: string;
    sentiment: string;
    user: PublicKey;
  };

  const addTweet = async ({ text, image, sentiment, user }: Tweet) => {
    const keypair = web3.Keypair.generate();
    const tx = await program.methods
      .addTweet(text, image, sentiment)
      .accounts({
        tweet: keypair.publicKey,
        user,
        systemProgram: "11111111111111111111111111111111",
      })
      .signers([keypair])
      .rpc({
        preflightCommitment: "processed",
      });
    return tx;
  };

  const solTweet = async () => {
    if (!tweet) return;

    let img = "No Image";
    if (imageFile) {
      const data = imageFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        }),
        body: JSON.stringify({ text: tweet }),
      });
      const data = await response.json();
      setSentiment(data.sentiment);
    } catch (error) {
      console.log(error);
    }
    const success = await addTweet({
      text: tweet,
      image: img,
      sentiment,
      user: user?.get("solAddress"),
    });
    if (success) {
      console.log(success);
      saveTweet();
    }
  };

  const saveTweet = async () => {
    const Tweets = Moralis.Object.extend("Tweets");
    const Tweet = new Tweets();
    if (!tweet) return;
    Tweet.set("tweetTxt", tweet);
    Tweet.set("account", user?.attributes.solAddress);
    Tweet.set("pft", user?.attributes.pft);
    Tweet.set("username", user?.attributes.username);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        }),
        body: JSON.stringify({ text: tweet }),
      });
      const data = await response.json();
      Tweet.set("sentiment", data.sentiment);
    } catch (error) {
      console.log(error);
    }

    if (imageFile) {
      const data = imageFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      Tweet.set("tweetImg", file.ipfs());
    }
    await Tweet.save();
    setTweet("");
    setImageFile(undefined);
    setImage("");
    reload();
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
            onClick={saveTweet}
          >
            Tweet
          </button>
          <button
            className="bg-cyan-500 p-4 rounded-full hover:bg-cyan-400"
            onClick={solTweet}
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

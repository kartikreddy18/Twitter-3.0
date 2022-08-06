import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { useMoralis } from "react-moralis";

const SettingsForm = () => {
  const { reload } = useRouter();
  const { Moralis } = useMoralis();
  // const pfts = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg", "/6.jpg"];
  const [pft, setPft] = useState("/1.jpg");
  const [pftFile, setPftFile] = useState<File>();
  const pref = useRef<HTMLInputElement>(null);
  // const [pK, setPK] = useState(0);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [bannerFile, setBannerFile] = useState<File>();
  const bannerRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    bannerRef.current?.click();
  };
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      try {
        setBannerFile(files[0]);
        setImage(URL.createObjectURL(files[0]));
      } catch (error) {}
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name || bio || pftFile || bannerFile) {
      const User = Moralis.Object.extend("_User");
      const query = new Moralis.Query(User);
      const myDetails = await query.first();

      if (name) {
        myDetails?.set("username", name);
      }
      if (bio) {
        myDetails?.set("bio", bio);
      }
      if (pftFile) {
        const data = pftFile;
        const file = new Moralis.File(data.name, data);
        await file.saveIPFS();
        myDetails?.set("pft", file.ipfs());
      }
      if (bannerFile) {
        const data = bannerFile;
        const file = new Moralis.File(data.name, data);
        await file.saveIPFS();
        myDetails?.set("banner", file.ipfs());
      }
      await myDetails?.save();
      reload();
    } else return;
  };
  return (
    <form
      action=""
      className="space-y-10 flex flex-col items-center mt-5 border-t border-t-gray-800 pt-5 px-10"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        placeholder="name"
        className="p-5 text-center rounded-full outline-none bg-transparent border border-cyan-800 w-full text-gray-200 focus:border-cyan-500 hover:border-cyan-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="bio"
        className="p-5 text-center rounded-full outline-none bg-transparent border border-cyan-800 w-full text-gray-200 focus:border-cyan-500 hover:border-cyan-500"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <div className="w-full">
        {/* moralis wallet connection nfts */}
        <h2 className="text-gray-500">Profile Image(NFTs)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 w-full items-center justify-center gap-3 lg:flex mt-5">
          <div
            className="cursor-pointer"
            onClick={() => {
              pref.current?.click();
            }}
          >
            <div className="ring max-w-max flex items-center rounded-full">
              <Image
                src={pft}
                width={100}
                height={100}
                objectFit="contain"
                alt=""
                className={`rounded-full`}
              />
            </div>
            <input
              type="file"
              accept="image"
              name=""
              id=""
              className="hidden"
              ref={pref}
              onChange={(e) => {
                const file = e.target.files;
                if (file) {
                  try {
                    setPftFile(file[0]);
                    setPft(URL.createObjectURL(file[0]));
                  } catch (error) {}
                }
              }}
            />
          </div>
          {/* {pfts.map((pft, index) => (
            <div
              key={index}
              className={`${
                pK === index && "ring max-w-max flex items-center rounded-full"
              }`}
            >
              <Image
                src={pft}
                width={100}
                height={100}
                objectFit="contain"
                alt=""
                className={`rounded-full cursor-pointer `}
                onClick={() => {
                  setPK(index);
                  setPft(pft);
                  const file = readFileSync(pft)
                  const blob = new Blob([file], { type: 'image' })
                  setPftFile(new File([blob], pft, { type: 'image' }))
                }}
              />
            </div>
          ))} */}
        </div>
      </div>
      <div className="">
        <h2 className="text-gray-500 border-t border-t-gray-800 py-2">
          Profile Banner
        </h2>
        <div onClick={handleClick} className="cursor-pointer rounded">
          <Image
            src={image || "/banner.png"}
            width={1000}
            height={500}
            alt=""
            className="rounded"
          />
          <input
            type="file"
            accept="image"
            name=""
            id=""
            className="hidden"
            ref={bannerRef}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="w-full flex items-end justify-end p-1">
        <button
          className="bg-cyan-500 p-3 rounded font-semibold hover:bg-cyan-400"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;

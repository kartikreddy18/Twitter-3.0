import Banner from "./Heading";
import SettingsForm from "./SettingsForm";

const Settings = () => {
  return (
    <div className="w-full p-2">
      <Banner title={"Settings"} />
      <div className="">
        <SettingsForm />
      </div>
    </div>
  );
};

export default Settings;

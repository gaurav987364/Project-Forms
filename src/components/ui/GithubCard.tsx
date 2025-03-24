import React from "react";

interface Props {
  avatar_url: string;
  name: string | undefined;
  company: string;
}

const GithubCard: React.FC<Props> = ({ avatar_url, name, company }) => {
  return (
    <div className="flex items-center max-w-lg w-full h-full bg-slate-800 shadow-md  p-1 border border-gray-200">
      {/* Avatar */}
      <img
        src={avatar_url || "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"}
        alt={name}
        loading="lazy"
        className="w-8 h-8 rounded-full border-2 border-gray-300"
      />

      {/* User Info */}
      <div className="ml-4 flex-1">
        <h2 className="text-md font-semibold text-white line-clamp-1">{name}</h2>
        <p className="text-xs text-gray-200 mt-0.5 line-clamp-1">{company || "Your Name"}</p>
      </div>
    </div>
  );
};

export default GithubCard;
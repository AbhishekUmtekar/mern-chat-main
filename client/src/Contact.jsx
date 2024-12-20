import Avatar from "./Avatar.jsx";

export default function Contact({
  id,
  username,
  onClick,
  selected,
  online,
  unreadCount,
}) {
  return (
    <div
      key={id}
      onClick={() => onClick(id)}
      className={
        "border-b border-gray-100 flex items-center gap-2 cursor-pointer " +
        (selected ? "bg-blue-50" : "")
      }
    >
      {selected && <div className="w-1 bg-blue-500 h-12 rounded-r-md"></div>}
      <div className="flex gap-2 py-2 pl-4 items-center">
        <Avatar online={online} username={username} userId={id} />
        <span className={selected ? "text-black font-medium text-base" : "contact-name"}>{username}</span>
        {unreadCount > 0 && (
          <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs ml-auto">
            {unreadCount}
          </span>
        )}
      </div>
    </div >
  );
}

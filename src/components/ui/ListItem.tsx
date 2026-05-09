import Dot from "./Dot";

interface ListItemProps {
  index: string;
  name: string;
  status: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ index, name, status, onChange, checked }) => {
  const isComplete = status === "complete";
  return (
    <div
      className={`w-full border rounded-xl p-4 flex justify-between items-center transition-colors
        ${isComplete
          ? "bg-zinc-900 border-zinc-700 opacity-60"
          : "bg-zinc-900 border-zinc-700 hover:border-orange-500/50"
        }`}
    >
      <div className="flex items-center gap-3">
        <Dot status={status} />
        <span className={`text-base ${isComplete ? "line-through text-zinc-500" : "text-white"}`}>
          {name}
        </span>
      </div>
      <input
        type="checkbox"
        name={name}
        onChange={onChange}
        checked={checked}
        className="w-5 h-5 rounded accent-orange-500 cursor-pointer"
      />
    </div>
  );
};

export default ListItem;

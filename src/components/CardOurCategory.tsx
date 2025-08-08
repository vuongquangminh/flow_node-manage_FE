import { ArrowRight } from "lucide-react";

export default function CardOurCategory({
  item,
}: {
  item: { id: number; image: string; title: string };
}) {
  return (
    <div className="relative overflow-hidden px-2">
      <div className="w-full overflow-hidden">
        <img
          className="w-full overflow-hidden hover:scale-105 duration-500 ease-in-out"
          src={item.image}
          alt=""
        />
      </div>

      <div className="absolute px-6 py-4 w-full bottom-0 max-w-[800px] text-white flex justify-between items-center">
        <h2 className="text-sm sm:text-2xl font-bold font-fantasy">
          {item.title}
        </h2>
        <div className=" text-primary rounded-none text-lg border-inherit border p-3 hover:bg-gray-100 cursor-pointer">
          <ArrowRight size={24} />
        </div>
      </div>
    </div>
  );
}

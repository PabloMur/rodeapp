import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  testimonial: string;
  date: string;
  avatar: string;
}

const TestimonialCard = ({
  name,
  location,
  rating,
  testimonial,
  date,
  avatar,
}: TestimonialCardProps) => {
  return (
    <div className="bg-zinc-900 border border-zinc-700 p-5 rounded-2xl m-3">
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={avatar}
          alt={name}
          width={48}
          height={48}
          className="rounded-full object-cover border-2 border-orange-500"
        />
        <div>
          <h2 className="text-white font-semibold text-base">{name}</h2>
          <p className="text-zinc-500 text-sm">{location}</p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? "text-orange-500" : "text-zinc-700"}>
            ★
          </span>
        ))}
      </div>
      <p className="text-zinc-300 text-sm leading-relaxed">{testimonial}</p>
      <p className="text-zinc-600 text-xs mt-3">{date}</p>
    </div>
  );
};

export default TestimonialCard;

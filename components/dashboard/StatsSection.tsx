import { Clapperboard, Star, Heart, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Movies Watched",
    value: "108",
    subtitle: "+12 movie this year",
    color: "#67E8F9",
    iconBg: "#31545B",
    icon: Clapperboard,
  },
  {
    title: "Average Rating",
    value: "4.5",
    subtitle: "+0.3 from last year",
    color: "#F5C518",
    iconBg: "#5C4D1D",
    icon: Star,
  },
  {
    title: "Watchlist",
    value: "28",
    subtitle: "+15 added this year",
    color: "#FF4D4D",
    iconBg: "#5B2B2B",
    icon: Heart,
  },
];

export default function StatsSection() {
  return (
    <div className="relative top-4.5 flex justify-center gap-[90px] select-none">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              flex
              h-[115px]
              w-[300px]
              shrink-0
              items-center
              rounded-2xl
              bg-[#2B2B2B]
              px-4
              transition
              duration-300
              hover:-translate-y-1
              hover:bg-[#323232]
            "
          >
            {/* Icon */}
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-full
                relative left-4
              "
              style={{
                backgroundColor: item.iconBg,
              }}
            >
              <Icon
                size={28}
                color={item.color}
                strokeWidth={2}
              />
            </div>

            {/* Text */}
            <div className="relative left-9">
              <p className="text-sm text-[#B5B5B5]">
                {item.title}
              </p>

              <h2
                className="
                  relative top-1.5
                  text-[40px]
                  font-bold
                  leading-none
                  text-white
                "
              >
                {item.value}
              </h2>

              <div
                className="
                  relative top-2
                  flex
                  items-center
                  gap-1
                  text-xs
                  font-medium
                "
                style={{
                  color: item.color,
                }}
              >
                {item.subtitle}

                <TrendingUp size={13} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
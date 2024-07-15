import SectionHeading from "@/components/SectionHeading";
import { formatTupleDate } from "@/lib/utils";

const EVENTS = [
  {
    title: "Live Music",
    description: "Live music by John Doe!",
    date: "July 1, 2022",
  },
  {
    title: "Live Music",
    description: "Live music by John Doe!",
    date: "July 14, 2022",
  },
  {
    title: "Coffee Tasting",
    description: "Join us for a coffee tasting session!",
    date: "July 20, 2024",
  },
  {
    title: "Live Music",
    description: "Live music by John Doe!",
    date: "July 21, 2022",
  },
  {
    title: "Art Exhibition",
    description: "Local artists displaying their work.",
    date: "August 5, 2024",
  },
  {
    title: "Book Club Meeting",
    description: "Discussing the latest bestsellers.",
    date: "August 15, 2024",
  },
  {
    title: "Jazz Night",
    description: "Enjoy a night of smooth jazz.",
    date: "September 1, 2024",
  },
];

const EventsSection = () => {
  const currentDate = new Date();

  // Filter future events
  const futureEvents = EVENTS.filter(
    (event) => new Date(event.date) > currentDate
  );

  return (
    <div className="bg-[#0c0b09] py-16">
      <div className="container">
        <SectionHeading
          className="pb-4"
          title="Events"
          description="What is happening at Case Study"
        >
          <span>Ask about using the space for your next venue or event!</span>
        </SectionHeading>

        <div className="mt-4">
          <div className="px-2 py-1 bg-teal-600 md:py-2">Today</div>
          <p className="p-4 hover:bg-zinc-900">No Events Today</p>
          <div className="px-2 py-1 bg-gray-600 md:py-2">Future Events</div>
          <div className="divide-y-2">
            {futureEvents.map((event, index) => {
              const [day, month] = formatTupleDate(new Date(event.date));

              return (
                <div
                  key={index}
                  className="flex items-center justify-between px-2 py-2 md:px-4 hover:bg-zinc-900"
                >
                  <div>
                    <h4 className="font-semibold text-md">{event.title}</h4>
                    <p className="text-sm text-orange-400">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center h-full gap-2 text-center md:flex-col md:gap-0 align-center">
                    <p className="text-xl font-semibold">{day}</p>
                    <p className="text-lg">{month}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;

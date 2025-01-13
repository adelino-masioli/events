import { Event, RawEvent } from "@/types/event";
import { unstable_cache } from "next/cache";
import { fetchEventFromDatabase } from "./event";
import { formatEvent } from "./format-event";

const getEvent = unstable_cache(
  async (id: string): Promise<Event | null> => {
    const event: RawEvent | null = await fetchEventFromDatabase(id);
    return event ? formatEvent(event) : null;
  },
  ["event"],
  { tags: ["event"] }
);

export { getEvent };

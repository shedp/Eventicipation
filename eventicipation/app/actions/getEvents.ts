import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getEvents() {
  try {
    const currentUser = await getCurrentUser();
    let events;
    if (!currentUser) {
      events = await prisma.events.findMany({
        where: {
          userId: "6592cd221d21dce61841ef81",
        },
        orderBy: {
          date: "asc",
        },
      });
      // return [];
    } else {
      events = await prisma.events.findMany({
        where: {
          OR: [
            { userId: currentUser.id },
            { userId: "6592cd221d21dce61841ef81" },
          ],
        },
        orderBy: {
          date: "asc",
        },
      });
    }

    const safeEvents = events.map((event) => ({
      ...event,
      date: event.date.toISOString(),
    }));

    return safeEvents;
  } catch (error: any) {
    throw new Error(error);
  }
}

import prisma from "@/app/libs/prismadb";

export default async function deleteEvent(eventId: string) {
  try {
    const deletedEvent = await prisma.events.delete({
      where: {
        id: eventId,
      },
    });
    console.log("Deleted Event:", deletedEvent);
    return deletedEvent;
  } catch (error: any) {
    console.error("Error deleting event:", error);
    throw new Error(error);
  }
}

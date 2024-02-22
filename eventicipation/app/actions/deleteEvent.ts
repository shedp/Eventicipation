import prisma from "@/app/libs/prismadb";

export default async function deleteEvent(eventId: string) {
  console.log(eventId);
  let event;
  try {
    const deletedEvent = await prisma.events.delete({
      where: {
        id: eventId,
      },
    });
    return deletedEvent;
  } catch (error: any) {
    console.error("Error finding event:", error);
    throw new Error(error);
  }
}

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function deleteEvent(eventId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    const deletedEvent = await prisma.events.delete({
      where: {
        id: eventId,
      },
    });

    return deletedEvent;
  } catch (error: any) {
    throw new Error(error);
  }
}

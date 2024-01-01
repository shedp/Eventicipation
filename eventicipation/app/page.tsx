import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import getEvents from "./actions/getEvents";
import Card from "./components/cards/Cards";
import { differenceInCalendarDays, parseISO } from "date-fns";
import getCurrentUser from "./actions/getCurrentUser";
import DeleteModal from "./components/modals/DeleteModal";

export default async function Home() {
  const events = await getEvents();
  const currentUser = await getCurrentUser();

  const differenceInDays = (startDateString: string): number => {
    const startDate = parseISO(startDateString);
    const endDate = new Date();

    return differenceInCalendarDays(startDate, endDate);
  };

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {events.map((event: any) => {
            return (
              <>
                <Card
                  id={event.id}
                  userId={event.userId}
                  key={event.id}
                  title={event.title}
                  days={differenceInDays(event.date)}
                  category={event.category}
                  description={event.description}
                  currentUser={currentUser}
                />
                <DeleteModal id={event.id} />
              </>
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}

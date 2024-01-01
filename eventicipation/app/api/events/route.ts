import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { category, date, frequency, period, title, description } = body;
  if (!category || !date || !title) {
    return NextResponse.error();
  }
  const formatDate = new Date(date).toISOString();
  const formatFrequency = parseInt(frequency);

  const events = await prisma.events.create({
    data: {
      category,
      date: formatDate,
      frequency: formatFrequency,
      period,
      title,
      description,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(events);
}

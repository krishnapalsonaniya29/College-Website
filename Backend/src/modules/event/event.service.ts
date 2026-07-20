import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get Public Events
|--------------------------------------------------------------------------
*/

export const getEvents = async () => {
  return prisma.event.findMany({
    where: {
      isActive: true,
    },
    orderBy: [
      {
        eventDate: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

/*
|--------------------------------------------------------------------------
| Get Admin Events
|--------------------------------------------------------------------------
*/

export const getAdminEvents = async () => {
  return prisma.event.findMany({
    orderBy: [
      {
        eventDate: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

/*
|--------------------------------------------------------------------------
| Get Event By ID
|--------------------------------------------------------------------------
*/

export const getEventById = async (id: number) => {
  return prisma.event.findUnique({
    where: {
      id,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Create Event
|--------------------------------------------------------------------------
*/

export const createEvent = (
  data: Prisma.EventCreateInput
) => {
  return prisma.event.create({
    data,
  });
};

/*
|--------------------------------------------------------------------------
| Update Event
|--------------------------------------------------------------------------
*/

export const updateEvent = async (
  id: number,
  data: Prisma.EventUpdateInput
) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  if (!event) {
    return null;
  }

  const updatedEvent = await prisma.event.update({
    where: {
      id,
    },
    data,
  });

  return {
    oldEvent: event,
    updatedEvent,
  };
};

/*
|--------------------------------------------------------------------------
| Delete Event
|--------------------------------------------------------------------------
*/

export const deleteEvent = async (id: number) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  if (!event) {
    return null;
  }

  await prisma.event.delete({
    where: {
      id,
    },
  });

  return event;
};
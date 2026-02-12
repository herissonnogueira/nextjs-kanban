"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./lib/prisma";

export async function getTasks() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return tasks;
}

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await prisma.task.create({
    data: {
      title,
      description: description || null,
    },
  });

  revalidatePath("/");
}

export async function updateTask(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string;

  await prisma.task.update({
    where: { id },
    data: {
      title,
      description: description || null,
      status,
    },
  });

  revalidatePath("/");
}

export async function deleteTask(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.task.delete({
    where: { id },
  });

  revalidatePath("/");
}

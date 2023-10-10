"use server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function createPost(postInfo: Prisma.PostUncheckedCreateInput) {
  const newPost = await prisma.post.create({
    data: {
      ...postInfo,
    },
  });

  return newPost;
}

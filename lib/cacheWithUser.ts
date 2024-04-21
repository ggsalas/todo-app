import { auth } from "app/auth";
import { unstable_cache } from "next/cache";

type Callback = Parameters<typeof unstable_cache>[0];

export async function getSessionUser() {
  let session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) throw new Error("missing user from session");

  return session.user!;
}

// auth cannot be used inside unstable_cache function.
// It needs first get the session and then
// execute unstable_cache with the user as param.
export async function withUser(cb: Callback) {
  const user = await getSessionUser();

  return await cb(user!);
}

export const cacheWithUser = async (cb: Callback, tags: string[]) =>
  withUser(unstable_cache(cb, tags, { tags }));

// The tags are use to group all the similar requests
// Required to invalidate all at once on each mutation
export const TAGS = {
  userTasks: "user-tasks",
};

// import { getDefaultTeamForUser } from '@/lib/teams';
import { redirect } from "next/navigation";
// import { createServerClient } from '@/lib/supabase/server';
import { cookies } from "next/headers";

export async function GET(request: Request) {
  console.log("in dash redirect API route");
  // const supabase = createServerClient(cookieStore);
  // const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();

  const user = {
    id: "123",
  };

  if (!user) {
    redirect("/auth/signin");
  }

  // Get user's default team
  // const defaultTeam = await getDefaultTeamForUser(user.id);
  const defaultTeam = {
    slug: "default",
  };

  if (!defaultTeam) {
    redirect("/welcome");
  }

  // Set scope cookie for future visits
  cookieStore.set("btm_scope", defaultTeam.slug, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
  });

  // Redirect to the team page
  redirect(`/dashboard/${defaultTeam.slug}`);
}

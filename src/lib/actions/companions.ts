// src/lib/actions/companions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { checkRateLimit, withRateLimit } from "@/lib/rate-limit";

// ─── WRITE OPERATIONS (Stricter Limits) ─────────────────────────────

export const createCompanion = async (formData: CreateCompanion) => {
  // Rate limit: 3 companions per 5 minutes (sliding window)
  await checkRateLimit("createCompanion");

  const { userId: author } = await auth();
  if (!author) {
    throw new Error("Unauthorized");
  }

  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create a companion");
  }

  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  // Rate limit: 10 sessions per minute (sliding window)
  await checkRateLimit("addSession");

  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);
  return data;
};

// ─── READ OPERATIONS (Higher, Simpler Limits) ──────────────────────

export const getAllCompanions = withRateLimit(
  "read",
  async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    const supabase = createSupabaseClient();
    let query = supabase.from("companions").select();

    if (subject && topic) {
      query = query
        .ilike("subject", `%${subject}%`)
        .or(`topic.ilike.%${topic}%,name.ilike.%${topic}`);
    } else if (subject) {
      query = query.ilike("subject", `%${subject}%`);
    } else if (topic) {
      query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;
    if (error) throw new Error(error.message);
    return companions;
  },
);

export const getCompanion = withRateLimit("read", async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) {
    console.log(error);
    return null;
  }
  return data[0];
});

export const getRecentSessions = withRateLimit("read", async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions: companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data.map(({ companions }) => companions);
});

export const getUserSessions = withRateLimit(
  "read",
  async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("session_history")
      .select(`companions: companion_id (*)`)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);
    return data.map(({ companions }) => companions);
  },
);

export const getUserCompanions = withRateLimit(
  "read",
  async (userId: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("companions")
      .select()
      .eq("author", userId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },
);

export const newCompanionPermissions = withRateLimit("read", async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true;
  } else if (has({ feature: "3_companion_limit" })) {
    limit = 3;
  } else if (has({ feature: "10_companion_limit" })) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error.message);

  const companionCount = data?.length || 0;
  return companionCount < limit;
});

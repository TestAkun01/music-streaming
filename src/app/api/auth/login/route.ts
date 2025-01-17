import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // Pastiin client Supabase dibuat di server
import { cookies } from "next/headers";

export async function GET() {
  const supabase = createClient(cookies());

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ user: data.user });
}

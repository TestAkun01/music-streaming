import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // Pastiin client Supabase dibuat di server

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ user: data.session?.user });
}

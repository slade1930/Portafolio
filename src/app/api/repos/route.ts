import { fetchGithubData } from "@/lib/github";

export const revalidate = 86400;

export async function GET() {
  const data = await fetchGithubData();
  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}

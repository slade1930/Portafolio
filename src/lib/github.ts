export interface GithubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  size: number;
  updatedAt: string;
  createdAt: string;
  archived: boolean;
}

export interface GithubUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  htmlUrl: string;
}

export interface GithubData {
  user: GithubUser;
  repos: GithubRepo[];
  languages: { name: string; count: number }[];
  commitActivity: { week: string; total: number }[];
  totalCommits: number;
  fetchedAt: string;
}

const GH_API = "https://api.github.com";
const USER = process.env.GITHUB_USER ?? "slade1930";
const REVALIDATE_SECONDS = 86400;

async function gh<T>(path: string): Promise<T> {
  const res = await fetch(`${GH_API}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-flinn-nieto",
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

const fallback: GithubData = {
  user: {
    login: USER,
    name: null,
    avatarUrl: "https://avatars.githubusercontent.com/u/157079755?v=4",
    bio: null,
    followers: 0,
    following: 0,
    publicRepos: 15,
    htmlUrl: `https://github.com/${USER}`,
  },
  repos: [],
  languages: [],
  commitActivity: [],
  totalCommits: 0,
  fetchedAt: "offline",
};

interface RawUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

export async function fetchGithubData(): Promise<GithubData> {
  try {
    const [user, repos] = await Promise.all([
      gh<RawUser>(`/users/${USER}`),
      gh<Array<Record<string, unknown>>>(`/users/${USER}/repos?per_page=100&sort=updated`),
    ]);

    const parsedRepos: GithubRepo[] = repos.map((r) => ({
      id: Number(r.id),
      name: String(r.name),
      fullName: String(r.full_name),
      description: (r.description as string) ?? null,
      htmlUrl: String(r.html_url),
      homepage: (r.homepage as string) || null,
      language: (r.language as string) ?? null,
      stars: Number(r.stargazers_count ?? 0),
      forks: Number(r.forks_count ?? 0),
      size: Number(r.size ?? 0),
      updatedAt: String(r.updated_at ?? ""),
      createdAt: String(r.created_at ?? ""),
      archived: Boolean(r.archived),
    }));

    const parsedUser: GithubUser = {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      htmlUrl: user.html_url,
    };

    const languageCount = new Map<string, number>();
    for (const r of parsedRepos) {
      if (!r.language) continue;
      languageCount.set(r.language, (languageCount.get(r.language) ?? 0) + 1);
    }
    const languages = [...languageCount.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const repoNames = parsedRepos.slice(0, 8).map((r) => r.name);
    let totalCommits = 0;
    let commitActivity: { week: string; total: number }[] = [];

    const activityResults = await Promise.allSettled(
      repoNames.map((name) =>
        gh<Array<{ week: number; total: number }>>(
          `/repos/${USER}/${name}/stats/commit_activity`
        )
      )
    );

    const weeks = new Map<number, number>();
    for (const res of activityResults) {
      if (res.status !== "fulfilled" || !Array.isArray(res.value)) continue;
      for (const w of res.value) {
        weeks.set(w.week, (weeks.get(w.week) ?? 0) + (w.total || 0));
        totalCommits += w.total || 0;
      }
    }
    commitActivity = [...weeks.entries()]
      .sort((a, b) => a[0] - b[0])
      .slice(-16)
      .map(([week, total]) => ({
        week: new Date(week * 1000).toISOString().slice(0, 10),
        total,
      }));

    return {
      user: parsedUser,
      repos: parsedRepos,
      languages,
      commitActivity,
      totalCommits,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("[github] fetch fallback:", err);
    return fallback;
  }
}

# makefun-x-reposts-02 — entry by @muskabc

[![make.fun · makefun-x-reposts-02](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/muskabc/makefun-x-reposts-02/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/muskabc/makefun-x-reposts-02/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)

My entry for the make.fun bounty
["Get the most reposts and likes on make.fun's newest X posts"](https://make.fun/bounty/makefun-x-reposts-02):
posts of my own on X, each one a quote of, or a direct reply to, a different
one of [@makefunai](https://x.com/makefunai)'s newest posts, each carrying
make.fun and my play code in its own words. The house reads the posts'
reposts, quotes and likes from X at the deadline; my score is
`2 x reposts + 2 x quotes + likes` summed over all of them, and the top 50
share $500.

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win.

## Layout

- `POSTS.json` — the addresses of my posts, `{"posts": ["https://x.com/<handle>/status/<id>", ...]}`, up to 15.
- `main.ts` — the whole program: it validates `POSTS.json` and copies it to the output directory, where the gate reads it. Node 22+, standard library only, no network.

## Run it locally

```
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POSTS.json` is then byte for byte this repository's `POSTS.json`.

## Notes

- Every post is tied to a different pool post of @makefunai (its own posts
  from status 2125053632605196760 on); the posts stay public until the
  results are out.
- No engagement was bought, botted or made by accounts I control: the counts
  are whatever X shows.

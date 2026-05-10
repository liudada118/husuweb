"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function CmsLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      setMessage("");

      const response = await fetch("/api/cms/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { message?: string };
        setMessage(payload.message || "登录失败。");
        return;
      }

      router.push("/cms");
      router.refresh();
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] px-6 py-16 text-white md:px-10">
      <div className="mx-auto max-w-md rounded-[32px] border border-neutral-800 bg-neutral-950/80 p-10 shadow-2xl shadow-black/30">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
          CMS 后台
        </p>
        <h1 className="mb-3 text-4xl font-bold tracking-tight">登录后台</h1>
        <p className="mb-8 text-sm leading-6 text-neutral-400">
          使用 CMS 管理员账号进入内容编辑、可视化工作区和版本管理后台。
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-neutral-200">用户名</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-2xl border border-neutral-700 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-emerald-500"
              autoComplete="username"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-neutral-200">密码</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-neutral-700 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-emerald-500"
              autoComplete="current-password"
            />
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-800"
          >
            {isPending ? "登录中..." : "进入后台"}
          </button>
        </form>

        {message ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-700 bg-black/30 px-4 py-3 text-sm text-neutral-400">
            {message}
          </div>
        ) : null}
      </div>
    </div>
  );
}

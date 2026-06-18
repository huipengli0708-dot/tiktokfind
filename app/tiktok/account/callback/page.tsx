"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

function TikTokAccountCallbackContent() {
  const params = useSearchParams();
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window === "undefined" ? "" : window.location.href;
  const authCode = params.get("auth_code") || params.get("code");
  const state = params.get("state");

  const status = useMemo(() => {
    if (authCode) {
      return {
        icon: "OK",
        title: "TikTok 账号授权成功",
        message: "请复制下面的完整回调链接，粘贴回本地工具继续连接账号数据。",
        color: "#16a34a",
      };
    }

    return {
      icon: "!",
      title: "没有收到授权码",
      message: "TikTok 没有返回 auth_code 或 code，请从本地工具重新打开账号授权链接。",
      color: "#ef4444",
    };
  }, [authCode]);

  async function copyUrl() {
    if (!fullUrl) return;
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 py-20 text-slate-900">
      <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white"
          style={{ backgroundColor: status.color }}
        >
          {status.icon}
        </div>

        <h1 className="text-center text-2xl font-semibold">{status.title}</h1>
        <p className="mt-3 text-center text-sm leading-6 text-slate-600">
          {status.message}
        </p>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-left">
          <div className="text-xs font-medium text-slate-500">完整回调链接</div>
          <div className="mt-2 break-all font-mono text-sm leading-6 text-slate-800">
            {fullUrl || "正在读取链接..."}
          </div>
        </div>

        {authCode ? (
          <div className="mt-4 grid gap-3 rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">
            <div>
              <span className="font-medium">授权码：</span>
              <span className="break-all font-mono">{authCode}</span>
            </div>
            {state ? (
              <div>
                <span className="font-medium">State：</span>
                <span className="break-all font-mono">{state}</span>
              </div>
            ) : null}
          </div>
        ) : null}

        <button
          type="button"
          onClick={copyUrl}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {copied ? "已复制" : "复制完整链接"}
        </button>

        <p className="mt-4 text-center text-xs leading-5 text-slate-500">
          这个页面只用于接收 TikTok 账号授权跳转，不会公开显示你的密钥。
        </p>
      </div>
    </div>
  );
}

export default function TikTokAccountCallbackPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">正在读取授权结果...</div>}>
      <TikTokAccountCallbackContent />
    </Suspense>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function CallbackContent() {
  const params = useSearchParams();
  const authCode = params.get("auth_code") || params.get("code");
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: "#f0f2f5",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 12,
        padding: 40,
        maxWidth: 560,
        width: "90%",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}>
        {authCode ? (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h1 style={{ fontSize: 22, color: "#1a1a1a", marginBottom: 8 }}>TikTok 授权成功</h1>
            <p style={{ color: "#666", fontSize: 14, marginBottom: 28 }}>
              请复制下方链接，粘贴回本地工具完成连接
            </p>
            <div style={{
              background: "#f7f7f7",
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              padding: "14px 16px",
              fontFamily: "monospace",
              fontSize: 13,
              color: "#333",
              wordBreak: "break-all",
              textAlign: "left",
              marginBottom: 16,
            }}>
              {fullUrl}
            </div>
            <button
              onClick={handleCopy}
              style={{
                background: copied ? "#00c851" : "#fe2c55",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "12px 32px",
                fontSize: 15,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              {copied ? "已复制 ✓" : "复制完整链接"}
            </button>
            <p style={{ marginTop: 24, fontSize: 13, color: "#999" }}>
              粘贴到本地工具的「授权回调链接」输入框即可
            </p>
          </>
        ) : (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
            <h1 style={{ fontSize: 22, color: "#1a1a1a", marginBottom: 8 }}>未收到授权码</h1>
            <p style={{ color: "#e53935", fontSize: 14 }}>
              TikTok 未返回 auth_code，请重新发起授权
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function TikTokCallbackPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: 40 }}>加载中...</div>}>
      <CallbackContent />
    </Suspense>
  );
}

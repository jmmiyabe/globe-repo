"use client";

export default function AdminPage() {
  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login"; // force redirect
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome, Admin!</h1>
      <p>You are successfully logged in.</p>

      <button
        onClick={handleLogout}
        style={{ marginTop: "20px", padding: "8px 14px" }}
      >
        Logout
      </button>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Lock, User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { adminLogin, LOGO_URL } from "@/lib/api";

export default function AdminLogin() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (localStorage.getItem("goi_admin_token")) return <Navigate to="/admin" replace />;

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await adminLogin(form);
            localStorage.setItem("goi_admin_token", res.token);
            localStorage.setItem("goi_admin_username", res.username);
            toast.success("Welcome back!");
            navigate("/admin");
        } catch (err) {
            const detail = err.response?.data?.detail;
            const msg = typeof detail === "string" ? detail : "Login failed. Check your credentials.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-ink flex items-center justify-center px-6 py-12 goi-noise" data-testid="admin-login-page">
            <div className="absolute top-6 left-6">
                <a href="/" className="text-xs uppercase tracking-widest text-white/40 hover:text-white">← Back to site</a>
            </div>
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img src={LOGO_URL} alt="Game On India" className="h-20 w-auto mx-auto mb-6" />
                    <div className="goi-overline mb-2">Admin Panel</div>
                    <h1 className="font-display font-black text-3xl">Sign in.</h1>
                </div>
                <form onSubmit={submit} className="goi-card rounded-2xl p-8 space-y-4" data-testid="admin-login-form">
                    <div>
                        <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">Username</label>
                        <div className="relative">
                            <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                            <input
                                data-testid="admin-username-input"
                                required
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 focus:border-brand-cyan focus:outline-none"
                                autoComplete="username"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">Password</label>
                        <div className="relative">
                            <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                            <input
                                data-testid="admin-password-input"
                                type="password"
                                required
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 focus:border-brand-cyan focus:outline-none"
                                autoComplete="current-password"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        data-testid="admin-login-submit-btn"
                        className="goi-btn-primary w-full justify-center disabled:opacity-50"
                    >
                        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

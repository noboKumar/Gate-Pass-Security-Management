"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  FileText,
  Clock,
  ShieldCheck,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  UserCheck,
  Sparkles,
  UserPlus,
  Phone,
  Smartphone,
  Trash2,
  Calendar,
  Building2,
  User,
  LogOut,
  Menu,
  X,
  RefreshCw,
  Clock3,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState("dashboard"); // overview, visitor-register, visitor-list, mobile-search, employee-pass
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Data States
  const [visitors, setVisitors] = useState<any[]>([]);
  const [gatePasses, setGatePasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form States - Visitor Registration
  const [visitorName, setVisitorName] = useState("");
  const [visitorMobile, setVisitorMobile] = useState("");
  const [visitorCompany, setVisitorCompany] = useState("");
  const [visitorPurpose, setVisitorPurpose] = useState("");
  const [visitorPerson, setVisitorPerson] = useState("");
  const [visitorFormLoading, setVisitorFormLoading] = useState(false);

  // Form States - Employee Gate Pass
  const [empName, setEmpName] = useState("");
  const [empDept, setEmpDept] = useState("IT");
  const [empReason, setEmpReason] = useState("");
  const [empFormLoading, setEmpFormLoading] = useState(false);

  // Mobile Search States
  const [searchMobileQuery, setSearchMobileQuery] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState<any[]>([]);
  const [isSearchingMobile, setIsSearchingMobile] = useState(false);

  // Visitor List Search/Filters
  const [visitorSearchTerm, setVisitorSearchTerm] = useState("");
  const [visitorFilterStatus, setVisitorFilterStatus] = useState("all"); // all, checked-in, checked-out

  // Fetch Data functions
  const fetchVisitors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/visitors");
      if (res.ok) {
        const data = await res.json();
        setVisitors(data);
      }
    } catch (err) {
      console.error("Error fetching visitors:", err);
    }
  };

  const fetchGatePasses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/gate-passes");
      if (res.ok) {
        const data = await res.json();
        setGatePasses(data);
      }
    } catch (err) {
      console.error("Error fetching gate passes:", err);
    }
  };

  const reloadAllData = async () => {
    setIsLoading(true);
    await Promise.all([fetchVisitors(), fetchGatePasses()]);
    setIsLoading(false);
  };

  useEffect(() => {
    reloadAllData();
  }, []);

  // Flash Message Handlers
  const flashSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const flashError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 4000);
  };

  // Submit Visitor Registration
  const handleVisitorRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation
    if (!visitorName.trim()) return flashError("Visitor Name is required.");
    if (visitorMobile.trim().length < 11)
      return flashError("Mobile number must be at least 11 digits.");
    if (!visitorPurpose.trim())
      return flashError("Purpose of visit is required.");
    if (!visitorPerson.trim()) return flashError("Person to Meet is required.");

    setVisitorFormLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: visitorName,
          mobile: visitorMobile,
          company: visitorCompany || undefined,
          purpose: visitorPurpose,
          personToMeet: visitorPerson,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        flashSuccess("Visitor successfully registered and checked in!");
        // Reset Form
        setVisitorName("");
        setVisitorMobile("");
        setVisitorCompany("");
        setVisitorPurpose("");
        setVisitorPerson("");

        // Refresh visitors
        fetchVisitors();
        // Redirect to visitor list
        setActiveTab("visitor-list");
      } else {
        flashError(data.error || "Failed to register visitor.");
      }
    } catch (err) {
      flashError("Network error. Please try again.");
    } finally {
      setVisitorFormLoading(false);
    }
  };

  // Check out visitor
  const handleVisitorCheckOut = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/visitors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkOut: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        flashSuccess("Visitor successfully checked out.");
        fetchVisitors();
        // If searching mobile, re-trigger mobile search to show check-out time
        if (searchMobileQuery) {
          triggerMobileSearch(searchMobileQuery);
        }
      } else {
        const data = await res.json();
        flashError(data.error || "Failed to checkout visitor.");
      }
    } catch (err) {
      flashError("Network error. Please try again.");
    }
  };

  // Delete visitor
  const handleVisitorDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this visitor record?"))
      return;
    try {
      const res = await fetch(`http://localhost:5000/api/visitors/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        flashSuccess("Visitor record deleted.");
        fetchVisitors();
        // Refresh mobile search if active
        if (searchMobileQuery) {
          setMobileSearchResults((prev) => prev.filter((p) => p.id !== id));
        }
      } else {
        flashError("Failed to delete record.");
      }
    } catch (err) {
      flashError("Network error.");
    }
  };

  // Submit Employee Gate Pass
  const handleEmployeeGatePassRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!empName.trim()) return flashError("Employee Name is required.");
    if (!empReason.trim())
      return flashError("Reason for Gate Pass is required.");

    setEmpFormLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/gate-passes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeName: empName,
          department: empDept,
          reason: empReason,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        flashSuccess("Employee gate pass created successfully!");
        setEmpName("");
        setEmpReason("");
        fetchGatePasses();
      } else {
        flashError(data.error || "Failed to create gate pass.");
      }
    } catch (err) {
      flashError("Network error.");
    } finally {
      setEmpFormLoading(false);
    }
  };

  // Update employee gate pass status
  const handleGatePassStatusUpdate = async (
    id: string,
    status: "APPROVED" | "RETURNED",
  ) => {
    try {
      const updatePayload: any = { status };
      if (status === "APPROVED" || status === "RETURNED") {
        updatePayload.exitTime = new Date().toISOString();
      }

      const res = await fetch(`http://localhost:5000/api/gate-passes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      if (res.ok) {
        flashSuccess(
          `Gate pass successfully marked as ${status.toLowerCase()}!`,
        );
        fetchGatePasses();
      } else {
        flashError("Failed to update status.");
      }
    } catch (err) {
      flashError("Network error.");
    }
  };

  // Delete employee gate pass
  const handleGatePassDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee gate pass?"))
      return;
    try {
      const res = await fetch(`http://localhost:5000/api/gate-passes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        flashSuccess("Gate pass record deleted.");
        fetchGatePasses();
      } else {
        flashError("Failed to delete record.");
      }
    } catch (err) {
      flashError("Network error.");
    }
  };

  // Mobile number search trigger
  const triggerMobileSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsSearchingMobile(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/visitors?mobile=${query}`,
      );
      if (res.ok) {
        const data = await res.json();
        setMobileSearchResults(data);
      } else {
        flashError("Failed to complete mobile search.");
      }
    } catch (err) {
      flashError("Network error.");
    } finally {
      setIsSearchingMobile(false);
    }
  };

  // Formatted date string helper
  const formatDate = (isoString: string) => {
    if (!isoString) return "--";
    try {
      const date = new Date(isoString);
      return (
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
        " " +
        date.toLocaleDateString([], { month: "short", day: "numeric" })
      );
    } catch (e) {
      return isoString;
    }
  };

  // Filtered visitor list computations
  const filteredVisitors = visitors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(visitorSearchTerm.toLowerCase()) ||
      v.mobile.includes(visitorSearchTerm) ||
      (v.company &&
        v.company.toLowerCase().includes(visitorSearchTerm.toLowerCase())) ||
      v.personToMeet.toLowerCase().includes(visitorSearchTerm.toLowerCase());

    if (visitorFilterStatus === "all") return matchesSearch;
    if (visitorFilterStatus === "checked-in")
      return matchesSearch && !v.checkOut;
    if (visitorFilterStatus === "checked-out")
      return matchesSearch && v.checkOut;
    return matchesSearch;
  });

  // Calculate live stats for overview
  const activeVisitorsCount = visitors.filter((v) => !v.checkOut).length;
  const pendingApprovalsCount = gatePasses.filter(
    (g) => g.status === "PENDING",
  ).length;
  const activeGatePassesCount = gatePasses.filter(
    (g) => g.status === "APPROVED",
  ).length;
  const totalVisitorsTodayCount = visitors.length; // Simple metric

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "visitor-register", label: "Register Visitor", icon: UserPlus },
    { id: "visitor-list", label: "Visitor List", icon: Users },
    { id: "mobile-search", label: "Mobile Search", icon: Smartphone },
    { id: "employee-pass", label: "Employee Gate Pass", icon: FileText },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50/30">
      {/* Dashboard Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-blue-600 animate-pulse" />
            <Link
              href={"/"}
              className="font-bold tracking-tight text-slate-900 text-lg"
            >
              Gate Pass Management
            </Link>
            <span className="hidden sm:inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
              v1.0.0
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Stats or Live indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              System Live
            </div>

            {/* Reload Data Button */}
            <button
              onClick={reloadAllData}
              disabled={isLoading}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"
              title="Refresh Data"
            >
              <RefreshCw
                className={`h-4.5 w-4.5 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-2 border-l border-slate-100 pl-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold font-sans shadow-xs">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-slate-800">
                  System Admin
                </span>
                <span className="block text-[10px] text-slate-400">
                  admin@gatepass.com
                </span>
              </div>
            </div>

            {/* Mobile Sidebar Menu Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="md:hidden p-2 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {isMobileSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Toast Notification Container */}
        <div className="fixed top-20 right-6 z-[100] max-w-sm space-y-2 pointer-events-none">
          {successMessage && (
            <div className="bg-emerald-500 text-white rounded-xl px-4 py-3.5 shadow-lg flex items-center gap-2.5 text-sm font-semibold pointer-events-auto border border-emerald-600 animate-slide-in">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div className="bg-rose-500 text-white rounded-xl px-4 py-3.5 shadow-lg flex items-center gap-2.5 text-sm font-semibold pointer-events-auto border border-rose-600 animate-shake">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* SIDEBAR - DESKTOP & MOBILE DRAWER */}
        <aside
          className={`w-full md:w-64 bg-white border-r border-slate-100 flex flex-col z-35 shrink-0
            ${isMobileSidebarOpen ? "block absolute inset-y-0 left-0 h-[calc(100vh-4rem)] border-r shadow-lg bg-white" : "hidden"} 
            md:block transition-all duration-300 md:sticky md:top-16 md:h-[calc(100vh-4rem)]`}
        >
          <div className="p-6 hidden md:flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-blue-600 animate-pulse" />
              <span className="font-bold text-slate-900 tracking-tight text-md">
                Gate Admin Panel
              </span>
            </div>
          </div>

          {/* Sidebar Links */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-250
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-xs"
                      : "text-slate-500 hover:text-slate-950 hover:bg-slate-50/80"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}
                  />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-100">
            <button
              onClick={() => {
                if (confirm("Are you sure you want to sign out?")) {
                  router.push("/login");
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50/50 hover:text-rose-700 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* CONTENT PANEL */}
        <div className="flex-1 p-6 md:p-8 lg:p-10">
          {/* TAB 1: dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in">
              {/* Top Info Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full w-fit mb-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Real-time Status Feed</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Security Overview
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Integrative dashboard displaying check-in and check-out
                    logs.
                  </p>
                </div>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                      Active Visitors
                    </span>
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <UserCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">
                      {activeVisitorsCount}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Currently registered inside
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                      Active Gate Passes
                    </span>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">
                      {activeGatePassesCount}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Employees currently out
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                      Pending Pass Approvals
                    </span>
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                      <Clock className="h-5 w-5 animate-pulse" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">
                      {pendingApprovalsCount}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Requires security signature
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                      Integrity Status
                    </span>
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">
                      100%
                    </span>
                    <span className="text-xs font-medium text-emerald-600">
                      Secure
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Database connected & online
                  </p>
                </div>
              </div>

              {/* Quick Actions and Live terminal logs */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Terminal Logs */}
                <div className="bg-white border border-slate-100 shadow-xs rounded-2xl p-6 lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-slate-900 text-md">
                      Live Security Gate Log
                    </h3>
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-700/10 animate-pulse">
                      Online Feed
                    </span>
                  </div>
                  <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs space-y-2.5 h-48 overflow-y-auto scrollbar-thin">
                    <p className="text-slate-500">
                      [{new Date().toLocaleTimeString()}] SYSTEM: Database
                      checked. Live sync operational.
                    </p>
                    {visitors.slice(0, 3).map((v, i) => (
                      <p key={`log-v-${i}`} className="text-emerald-400">
                        [{formatDate(v.createdAt).split(" ")[0]}] VISITOR ENTRY:{" "}
                        {v.name} ({v.company || "N/A"}) registered to meet{" "}
                        {v.personToMeet}.
                      </p>
                    ))}
                    {gatePasses.slice(0, 3).map((g, i) => (
                      <p
                        key={`log-g-${i}`}
                        className={
                          g.status === "APPROVED"
                            ? "text-blue-400"
                            : g.status === "PENDING"
                              ? "text-amber-400"
                              : "text-slate-400"
                        }
                      >
                        [{formatDate(g.createdAt).split(" ")[0]}] EMPLOYEE PASS:{" "}
                        {g.employeeName} ({g.department}) marked as {g.status}.
                      </p>
                    ))}
                    <p className="text-slate-500">
                      [{new Date().toLocaleTimeString()}] SYSTEM: Listening for
                      entry terminal broadcasts...
                    </p>
                  </div>
                </div>

                {/* Security Advisory */}
                <div className="bg-white border border-slate-100 shadow-xs rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <AlertCircle className="h-5 w-5 text-amber-500 animate-bounce" />
                      <h3 className="font-bold text-slate-900 text-md">
                        Security Advisory
                      </h3>
                    </div>
                    <ul className="mt-4 space-y-3.5 text-sm text-slate-600">
                      <li className="flex gap-2">
                        <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-2 shrink-0"></span>
                        All visitors must provide valid mobile contacts (11
                        digits).
                      </li>
                      <li className="flex gap-2">
                        <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-2 shrink-0"></span>
                        Check checkout timestamps daily to ensure no left-over
                        visitors.
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-xs text-slate-500 mt-4 leading-normal">
                    Support line: <strong>ext-4410</strong> (Chief Security
                    Marshal).
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISITOR REGISTRATION */}
          {activeTab === "visitor-register" && (
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Visitor Registration
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Register a new visitor entry. Generates a temporary pass.
                </p>
              </div>

              <form
                onSubmit={handleVisitorRegister}
                className="bg-white p-6 md:p-8 border border-slate-150 rounded-2xl shadow-xs space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">
                      Visitor Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">
                      Mobile Number (11+ digits) *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        maxLength={15}
                        value={visitorMobile}
                        onChange={(e) =>
                          setVisitorMobile(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="e.g. 01712345678"
                        className="pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">
                      Company (Optional)
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={visitorCompany}
                        onChange={(e) => setVisitorCompany(e.target.value)}
                        placeholder="e.g. Acme Corp"
                        className="pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
                      />
                    </div>
                  </div>

                  {/* Person to Meet */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">
                      Host (Person to Meet) *
                    </label>
                    <div className="relative">
                      <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={visitorPerson}
                        onChange={(e) => setVisitorPerson(e.target.value)}
                        placeholder="e.g. Jane Cooper"
                        className="pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Purpose of Visit */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Purpose of Visit *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={visitorPurpose}
                    onChange={(e) => setVisitorPurpose(e.target.value)}
                    placeholder="e.g. IT support & router inspection"
                    className="px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("overview")}
                    className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={visitorFormLoading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {visitorFormLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Register & Check In"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: VISITOR LIST */}
          {activeTab === "visitor-list" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Registered Visitors
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Logs of all visitors currently or previously checked in.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("visitor-register")}
                  className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 w-fit shadow-xs"
                >
                  <Plus className="h-4 w-4" />
                  Add Visitor
                </button>
              </div>

              {/* Filter controls */}
              <div className="bg-white border border-slate-100 rounded-2xl shadow-xs p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, mobile, host..."
                    value={visitorSearchTerm}
                    onChange={(e) => setVisitorSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 w-full transition-all"
                  />
                </div>

                <div className="flex items-center gap-2 bg-slate-50/50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm w-full sm:w-auto">
                  <Filter className="h-4 w-4 text-slate-500" />
                  <select
                    value={visitorFilterStatus}
                    onChange={(e) => setVisitorFilterStatus(e.target.value)}
                    className="bg-transparent border-0 focus:ring-0 focus:outline-hidden text-slate-700 text-xs font-semibold cursor-pointer w-full"
                  >
                    <option value="all">All Statuses</option>
                    <option value="checked-in">Still Checked In</option>
                    <option value="checked-out">Checked Out</option>
                  </select>
                </div>
              </div>

              {/* Visitor Table */}
              <div className="bg-white border border-slate-150 shadow-xs rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-4 px-6">Name</th>
                        <th className="py-4 px-6">Contact / Mobile</th>
                        <th className="py-4 px-6">Company</th>
                        <th className="py-4 px-6">Purpose</th>
                        <th className="py-4 px-6">Host / Person</th>
                        <th className="py-4 px-6">Check In</th>
                        <th className="py-4 px-6">Check Out</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredVisitors.length > 0 ? (
                        filteredVisitors.map((v) => (
                          <tr
                            key={v.id}
                            className="hover:bg-slate-50/30 transition-colors"
                          >
                            <td className="py-4 px-6 font-semibold text-slate-900">
                              {v.name}
                            </td>
                            <td className="py-4 px-6 font-mono text-xs">
                              {v.mobile}
                            </td>
                            <td className="py-4 px-6 text-slate-600">
                              {v.company || "--"}
                            </td>
                            <td className="py-4 px-6 text-slate-600">
                              {v.purpose}
                            </td>
                            <td className="py-4 px-6 text-slate-600">
                              {v.personToMeet}
                            </td>
                            <td className="py-4 px-6 text-slate-500 text-xs">
                              {formatDate(v.checkIn)}
                            </td>
                            <td className="py-4 px-6 text-slate-500 text-xs">
                              {v.checkOut ? (
                                <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm">
                                  {formatDate(v.checkOut)}
                                </span>
                              ) : (
                                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm font-semibold animate-pulse">
                                  Checked In
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {!v.checkOut && (
                                  <button
                                    onClick={() => handleVisitorCheckOut(v.id)}
                                    className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-colors"
                                  >
                                    Check Out
                                  </button>
                                )}
                                <button
                                  onClick={() => handleVisitorDelete(v.id)}
                                  className="text-xs font-semibold text-rose-500 hover:text-rose-700 p-1.5 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Delete Record"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={8}
                            className="py-12 text-center text-slate-400"
                          >
                            No visitor logs available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MOBILE NUMBER SEARCH */}
          {activeTab === "mobile-search" && (
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Mobile Number Query
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Search checkout history and logs using a visitor's mobile
                  number.
                </p>
              </div>

              <div className="bg-white p-6 border border-slate-150 rounded-2xl shadow-xs space-y-4">
                <label className="block text-sm font-semibold text-slate-700">
                  Enter Phone / Mobile Number
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      value={searchMobileQuery}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setSearchMobileQuery(val);
                        if (val.trim()) triggerMobileSearch(val);
                      }}
                      placeholder="e.g. 01712345678"
                      className="pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 w-full transition-all"
                    />
                  </div>
                  <button
                    onClick={() => triggerMobileSearch(searchMobileQuery)}
                    disabled={isSearchingMobile}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
                  >
                    {isSearchingMobile ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    Search Log
                  </button>
                </div>
              </div>

              {/* Results Output */}
              {searchMobileQuery && (
                <div className="space-y-4">
                  <h3 className="text-md font-bold text-slate-800">
                    Search Results ({mobileSearchResults.length})
                  </h3>

                  {mobileSearchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mobileSearchResults.map((log) => (
                        <div
                          key={log.id}
                          className="bg-white p-5 border border-slate-100 rounded-2xl shadow-xs relative overflow-hidden flex flex-col justify-between"
                        >
                          {/* Status tag */}
                          <div className="absolute top-4 right-4">
                            {log.checkOut ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-slate-150 px-2 py-0.5 text-xs font-semibold text-slate-700">
                                Checked Out
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                                Inside
                              </span>
                            )}
                          </div>

                          <div className="space-y-3">
                            <div>
                              <h4 className="font-bold text-slate-900 text-md">
                                {log.name}
                              </h4>
                              <p className="text-xs text-slate-400 font-mono mt-0.5">
                                {log.mobile}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-50 pt-3">
                              <div>
                                <span className="block text-slate-400 font-medium">
                                  Company
                                </span>
                                <span className="font-semibold text-slate-700">
                                  {log.company || "Individual"}
                                </span>
                              </div>
                              <div>
                                <span className="block text-slate-400 font-medium">
                                  Host (Person to Meet)
                                </span>
                                <span className="font-semibold text-slate-700">
                                  {log.personToMeet}
                                </span>
                              </div>
                            </div>

                            <div className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                              <span className="block text-slate-400 font-semibold mb-0.5">
                                Purpose
                              </span>
                              <p className="text-slate-700 leading-normal">
                                {log.purpose}
                              </p>
                            </div>
                          </div>

                          <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(log.checkIn).split(" ")[1]}
                            </span>
                            <span>
                              {log.checkOut
                                ? `Out: ${formatDate(log.checkOut).split(" ")[0]}`
                                : "Still inside"}
                            </span>
                          </div>

                          {/* Checkout trigger */}
                          {!log.checkOut && (
                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                              <button
                                onClick={() => handleVisitorCheckOut(log.id)}
                                className="text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 px-3 py-1.5 rounded-xl transition-all"
                              >
                                Check Out Now
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white py-12 border border-dashed border-slate-200 text-center text-slate-400 rounded-2xl">
                      No search results found for mobile query: "
                      {searchMobileQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EMPLOYEE GATE PASS (CREATE + LIST) */}
          {activeTab === "employee-pass" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Employee Gate Pass Management
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Generate gate passes for employees leaving premises for
                  official/personal reasons.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Form Column */}
                <div className="bg-white p-6 border border-slate-150 rounded-2xl shadow-xs space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-md">
                      Request Gate Pass
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fill in details to request approval.
                    </p>
                  </div>

                  <form
                    onSubmit={handleEmployeeGatePassRegister}
                    className="space-y-4"
                  >
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Employee Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={empName}
                          onChange={(e) => setEmpName(e.target.value)}
                          placeholder="e.g. Robert Downy"
                          className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 w-full transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Department *
                      </label>
                      <select
                        value={empDept}
                        onChange={(e) => setEmpDept(e.target.value)}
                        className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 w-full bg-white transition-all font-semibold"
                      >
                        <option value="IT">Information Technology (IT)</option>
                        <option value="HR">Human Resources (HR)</option>
                        <option value="Finance">Finance & Accounts</option>
                        <option value="Operations">Operations</option>
                        <option value="Sales">Sales & Marketing</option>
                        <option value="Procurement">Procurement</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Reason for Pass *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={empReason}
                        onChange={(e) => setEmpReason(e.target.value)}
                        placeholder="e.g. Off-site client server checkup"
                        className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 w-full transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={empFormLoading}
                      className="bg-blue-600 text-white font-semibold text-sm w-full py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {empFormLoading ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                      Create Pass Request
                    </button>
                  </form>
                </div>

                {/* List Column */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-md">
                      Recent Passes / Logs ({gatePasses.length})
                    </h3>
                    <button
                      onClick={fetchGatePasses}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <th className="py-3.5 px-5">Employee</th>
                            <th className="py-3.5 px-5">Department</th>
                            <th className="py-3.5 px-5">Reason</th>
                            <th className="py-3.5 px-5">Exit Time</th>
                            <th className="py-3.5 px-5">Status</th>
                            <th className="py-3.5 px-5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {gatePasses.length > 0 ? (
                            gatePasses.map((pass) => (
                              <tr
                                key={pass.id}
                                className="hover:bg-slate-50/30 transition-colors"
                              >
                                <td className="py-4 px-5">
                                  <span className="font-semibold text-slate-900 block">
                                    {pass.employeeName}
                                  </span>
                                  <span className="text-[10px] font-mono font-bold text-slate-400">
                                    {pass.id}
                                  </span>
                                </td>
                                <td className="py-4 px-5 text-slate-600 font-semibold">
                                  {pass.department}
                                </td>
                                <td
                                  className="py-4 px-5 text-slate-500 text-xs max-w-[150px] truncate"
                                  title={pass.reason}
                                >
                                  {pass.reason}
                                </td>
                                <td className="py-4 px-5 text-slate-500 text-xs">
                                  {pass.exitTime
                                    ? formatDate(pass.exitTime)
                                    : "--"}
                                </td>
                                <td className="py-4 px-5">
                                  {pass.status === "PENDING" && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/10">
                                      Pending
                                    </span>
                                  )}
                                  {pass.status === "APPROVED" && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/10">
                                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                      Approved
                                    </span>
                                  )}
                                  {pass.status === "RETURNED" && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-600/10">
                                      Returned
                                    </span>
                                  )}
                                </td>
                                <td className="py-4 px-5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    {pass.status === "PENDING" && (
                                      <button
                                        onClick={() =>
                                          handleGatePassStatusUpdate(
                                            pass.id,
                                            "APPROVED",
                                          )
                                        }
                                        className="text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md transition-all"
                                      >
                                        Approve
                                      </button>
                                    )}
                                    {pass.status === "APPROVED" && (
                                      <button
                                        onClick={() =>
                                          handleGatePassStatusUpdate(
                                            pass.id,
                                            "RETURNED",
                                          )
                                        }
                                        className="text-[11px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-md transition-all"
                                      >
                                        Mark Return
                                      </button>
                                    )}
                                    <button
                                      onClick={() =>
                                        handleGatePassDelete(pass.id)
                                      }
                                      className="text-slate-400 hover:text-rose-500 p-1 hover:bg-slate-50 rounded-md transition-colors"
                                      title="Delete Gate Pass"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={6}
                                className="py-12 text-center text-slate-400"
                              >
                                No gate pass logs available.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";

import {
  AlertTriangle,
  Siren,
  Menu,
  X,
  Cloud,
  Shield,
  Radio,
  Calendar,
  AlertCircle,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Users,
  Building2,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  category?: "LGU" | "Citizen";
}

export function DashboardNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lguDropdownOpen, setLguDropdownOpen] = useState(false);
  const [citizenDropdownOpen, setCitizenDropdownOpen] = useState(false);
  const { isAdmin, isGuest } = useUserRole();
  const router = useRouter();

  let lguTimeout: NodeJS.Timeout;
  let citizenTimeout: NodeJS.Timeout;

  const navItems: NavItem[] = [
    // Command Center (Main Dashboard)
    {
      label: "Command Center",
      href: "/lgu",
      icon: <LayoutDashboard className="h-4 w-4" />,
      category: "LGU",
    },
    // LGU Admin Dashboards
    {
      label: "Weather",
      href: "/lgu/weather",
      icon: <Cloud className="h-4 w-4" />,
      category: "LGU",
    },
    {
      label: "SAR & Security",
      href: "/lgu/sar-security",
      icon: <Shield className="h-4 w-4" />,
      category: "LGU",
    },
    {
      label: "Operations",
      href: "/lgu/operations",
      icon: <Radio className="h-4 w-4" />,
      category: "LGU",
    },
    // Citizen Dashboards
    {
      label: "Community Hub",
      href: "/citizen-hub",
      icon: <Siren className="h-4 w-4" />,
      category: "Citizen",
    },
    {
      label: "Services & Events",
      href: "/citizen/services-events",
      icon: <Calendar className="h-4 w-4" />,
      category: "Citizen",
    },
    {
      label: "Emergency Prep",
      href: "/citizen/emergency-prep",
      icon: <AlertCircle className="h-4 w-4" />,
      category: "Citizen",
    },
  ];

  const filteredItems = navItems.filter((item) => {
    if (isAdmin) return true;
    if (isGuest) return item.category !== "LGU";
    return true;
  });

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-sidebar border-b border-sidebar-border w-full shadow-md">
      <div className="flex items-center h-16 max-w-full px-2 md:px-4 lg:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 flex items-center gap-2 font-bold text-lg text-sidebar-foreground"
        >
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-sidebar-primary-foreground">
              PCC
            </span>
          </div>
          <span className="hidden sm:inline">Pasay Command Center</span>
          <span className="sm:hidden">WCC</span>
        </Link>

        {/* Centered Nav Links - Hidden on mobile */}
        <div className="hidden md:flex flex-1 justify-center gap-2 ml-4">
          {isAdmin && (
            <>
              <Link href="/lgu">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Command Center
                </Button>
              </Link>
              {filteredItems.some(
                (item) => item.category === "LGU" && item.href !== "/lgu"
              ) && (
                <div
                  className="relative"
                  onMouseEnter={() => {
                    clearTimeout(lguTimeout);
                    setLguDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    lguTimeout = setTimeout(
                      () => setLguDropdownOpen(false),
                      200
                    );
                  }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Building2 className="h-4 w-4" />
                    LGU Admin
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                  {lguDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-sidebar border border-sidebar-border rounded-md shadow-lg min-w-[200px] py-1 z-50">
                      {filteredItems
                        .filter(
                          (item) =>
                            item.category === "LGU" && item.href !== "/lgu"
                        )
                        .map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                            onClick={() => setLguDropdownOpen(false)}
                          >
                            <span className="shrink-0">{item.icon}</span>
                            <span>{item.label}</span>
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(citizenTimeout);
              setCitizenDropdownOpen(true);
            }}
            onMouseLeave={() => {
              citizenTimeout = setTimeout(
                () => setCitizenDropdownOpen(false),
                200
              );
            }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Users className="h-4 w-4" />
              Citizen Portal
              <ChevronDown className="h-3 w-3" />
            </Button>
            {citizenDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-sidebar border border-sidebar-border rounded-md shadow-lg min-w-[200px] py-1 z-50">
                {filteredItems
                  .filter((item) => item.category === "Citizen")
                  .map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      onClick={() => setCitizenDropdownOpen(false)}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions on the right */}
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <ThemeToggle />
          {isAdmin && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="hidden md:flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
          {/* Mobile toggle - Visible on mobile only */}
          <button
            className="md:hidden text-sidebar-foreground p-2 rounded-md hover:bg-sidebar-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu - Only visible on mobile */}
      {mobileOpen && (
        <div className="md:hidden pb-4 space-y-1 border-t border-sidebar-border mt-0 px-2">
          {isAdmin && filteredItems.some((item) => item.category === "LGU") && (
            <>
              <div className="text-xs font-semibold text-muted-foreground px-3 pt-3 pb-1">
                LGU ADMIN
              </div>
              {filteredItems
                .filter((item) => item.category === "LGU")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  </Link>
                ))}
              <div className="h-px bg-sidebar-border my-2" />
            </>
          )}
          <div className="text-xs font-semibold text-muted-foreground px-3 pt-1 pb-1">
            CITIZEN
          </div>
          {filteredItems
            .filter((item) => item.category === "Citizen")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          {isAdmin && (
            <Button
              variant="destructive"
              className="w-full justify-start gap-2 mt-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Navbar as UINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
} from "@heroui/react";
import { ThemeToggle } from "./ThemeToggle";
import { useScrollSpy } from "./hooks/useScrollSpy";

export const Navbar = () => {
  const activeId = useScrollSpy(["features", "voices"], {
    rootMargin: "-40% 0px -55% 0px",
  });
  return (
    <UINavbar
      maxWidth="xl"
      className="bg-white/5 backdrop-blur border-b border-white/10 rounded-none"
      aria-label="主导航"
    >
      <NavbarBrand className="gap-3">
        <Image src="/logo.svg" alt="PsyGo Logo（占位）" width={28} height={28} className="invert" />
        <span className="text-lg font-semibold tracking-tight">PsyGo</span>
      </NavbarBrand>
      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarItem>
          <Link
            href="#features"
            className={`text-sm hover:text-white ${activeId === "features" ? "text-white" : "text-white/80"}`}
            aria-current={activeId === "features" ? "page" : undefined}
          >
            特性
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#voices"
            className={`text-sm hover:text-white ${activeId === "voices" ? "text-white" : "text-white/80"}`}
            aria-current={activeId === "voices" ? "page" : undefined}
          >
            用户声音
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="#contact" color="primary" radius="full" className="font-medium" aria-label="联系我们">
            联系我们
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile */}
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle aria-label="打开菜单" />
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="#features" className="block py-2">
            特性
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#voices" className="block py-2">
            用户声音
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ThemeToggle />
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button as={Link} href="#contact" color="primary" radius="full" fullWidth>
            联系我们
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </UINavbar>
  );
};

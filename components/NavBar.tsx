"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar as UINavbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <UINavbar maxWidth="xl" className="bg-transparent" aria-label="主导航">
      <NavbarBrand className="gap-3">
        <Image src="/next.svg" alt="AI劳动力 Logo（占位）" width={28} height={28} className="invert" />
        <span className="text-lg font-semibold tracking-tight">AI劳动力</span>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link href="#features" className="text-sm text-white/80 hover:text-white">
            特性
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link href="#voices" className="text-sm text-white/80 hover:text-white">
            用户声音
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="#contact" color="primary" radius="full" className="font-medium">
            联系我们
          </Button>
        </NavbarItem>
      </NavbarContent>
    </UINavbar>
  );
};

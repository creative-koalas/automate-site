"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { motion } from "framer-motion";

const features = [
  {
    title: "省心",
    desc: "无需指导，长时间连续工作，自主解决环境配置、API接入等问题。",
    icon: "🧠",
  },
  {
    title: "懂你",
    desc: "自研类脑记忆系统，在工作中持续进化，逐渐与你心有灵犀。",
    icon: "🫱🏻‍🫲🏽",
  },
  {
    title: "自然",
    desc: "人类级交互体验，会发飞书、发邮件，甚至能联系你的领导。",
    icon: "💬",
  },
  {
    title: "One more thing... AutoMate...s",
    desc: "不是一个AI，而是一群AI，加一群人。人管AI、AI管AI、AI管人类。",
    icon: "∞",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),transparent_50%),linear-gradient(to_bottom,#020617_0%,#000_100%)]">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <Navbar maxWidth="xl" className="bg-transparent">
          <NavbarBrand className="gap-3">
            <Image src="/next.svg" alt="logo" width={28} height={28} className="invert" />
            <span className="text-lg font-semibold tracking-tight">AI劳动力</span>
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem className="hidden sm:flex">
              <Link href="#features" className="text-sm text-white/80 hover:text-white">特性</Link>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Link href="#voices" className="text-sm text-white/80 hover:text-white">用户声音</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} href="#contact" color="primary" radius="full" className="font-medium">
                联系我们
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:py-20">
        {/* Hero */}
        <section className="grid items-center gap-8 sm:grid-cols-2">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl font-bold tracking-tight"
            >
              让 AI 成为你的同事
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-base sm:text-lg text-white/70"
            >
              省心、懂你、自然。AutoMate...s 以群体智能与人机协同，让效率爆表。
            </motion.p>
            <div className="flex gap-3">
              <Button as={Link} href="#features" color="primary" radius="full" size="lg">
                了解特性
              </Button>
              <Button as={Link} href="#voices" variant="bordered" radius="full" size="lg" className="border-white/20 text-white">
                用户声音
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <video
                className="h-full w-full object-cover"
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                controls
                poster="/vercel.svg"
              />
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section id="features" className="mt-20 sm:mt-28">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-2xl sm:text-3xl font-semibold"
          >
            主打特性
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <Card className="h-full bg-white/5 backdrop-blur border border-white/10">
                  <CardHeader className="flex items-center gap-3">
                    <div className="text-2xl">{f.icon}</div>
                    <h3 className="text-lg font-semibold">{f.title}</h3>
                  </CardHeader>
                  <CardBody>
                    <p className="text-white/70 text-sm leading-6">{f.desc}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Voices */}
        <section id="voices" className="mt-20 sm:mt-28">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-2xl sm:text-3xl font-semibold"
          >
            用户声音
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white/5 backdrop-blur border border-white/10">
                <CardBody className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/10" />
                    <div>
                      <p className="text-sm font-medium">某行业客户 {i}</p>
                      <p className="text-xs text-white/60">CTO</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-6">
                    “接入后，我们让 AI 和同事一起排班，自动抄送、自动汇报，周转时间从天到小时。”
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="mt-20 sm:mt-28 border-t border-white/10 py-10 text-center text-white/60">
          <p>© {new Date().getFullYear()} AI劳动力. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

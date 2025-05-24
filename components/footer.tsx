"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import {
  IconArrowUpRight,
  IconCalendar,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const quickLinks = [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="relative mt-20 w-full overflow-hidden bg-gradient-to-b from-neutral-200 to-white dark:from-neutral-900 dark:to-black dark:text-white">
      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neutral-100/50 via-transparent to-blue-50/20 dark:from-neutral-900/50 dark:via-transparent dark:to-blue-950/20" />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-10 top-20 h-32 w-32 animate-pulse rounded-full bg-black/10 blur-3xl dark:bg-white/10" />
        <div
          className="absolute bottom-32 right-20 h-48 w-48 animate-pulse rounded-full bg-black/10 blur-3xl dark:bg-blue-500/10"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute left-1/3 top-1/2 h-24 w-24 animate-pulse rounded-full bg-black/10 blur-2xl dark:bg-purple-500/10"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto relative px-4 py-16 md:px-8 md:py-20"
      >
        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {/* CTA Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.h2
              className="text-4xl font-bold tracking-tight md:text-5xl"
              variants={itemVariants}
            >
              <span>Let's create</span>
              <br />
              <span className="inline-block md:text-4xl text-2xl bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-800 bg-clip-text text-transparent dark:from-neutral-400 dark:via-neutral-300 dark:to-neutral-500">
                incredible work together
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-lg text-neutral-500"
            >
              Ready to bring your vision to life? Let's collaborate and build
              something extraordinary that makes a lasting impact.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="mt-8">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-black to-neutral-800 px-8 py-4 text-lg font-semibold text-primary-foreground shadow-xl transition-all duration-300 hover:shadow-2xl dark:from-white dark:to-neutral-100"
                >
                  <IconCalendar className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  Start a Project
                  <motion.div className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <IconArrowUpRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact & Links Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-tight text-neutral-500 dark:text-neutral-400">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 py-1 text-neutral-500 transition-colors duration-300 hover:text-primary dark:text-neutral-300"
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {link.label}
                      </span>
                      <IconArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-tight text-neutral-500 dark:text-neutral-400">
                  Get in Touch
                </h3>
                <motion.div whileHover={{ scale: 1.02 }} className="group">
                  <Link
                    href="mailto:contact@sanjid.in"
                    className="flex items-center gap-3 rounded-xl border border-neutral-700/50 bg-black p-4 transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-800/90 dark:bg-neutral-800/50"
                  >
                    <div className="rounded-lg bg-blue-500/20 p-2 transition-colors duration-300 group-hover:bg-blue-500/30">
                      <IconMail className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-300 dark:text-neutral-500">
                        Email
                      </div>
                      <div className="text-white transition-colors duration-300 group-hover:text-blue-300">
                        contact@sanjid.in
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} className="group">
                <Link
                  href="/contact"
                  className="flex items-center gap-3 rounded-xl border border-neutral-700/50 bg-black p-4 transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-800/90 dark:bg-neutral-800/50"
                >
                  <div className="rounded-lg bg-green-500/20 p-2 transition-colors duration-300 group-hover:bg-green-500/30">
                    <IconCalendar className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-300 dark:text-neutral-500">
                      Schedule
                    </div>
                    <div className="text-white transition-colors duration-300 group-hover:text-green-300">
                      Book a Call
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 border-t border-neutral-800/50 pt-8"
        >
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            {/* Left Side - Location & Links */}
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <motion.div
                className="flex items-center gap-2 text-neutral-400"
                whileHover={{ scale: 1.05 }}
              >
                <IconMapPin className="h-4 w-4" />
                <span className="text-sm">Based in Kerala, India</span>
              </motion.div>

              <div className="hidden h-1 w-1 rounded-full bg-neutral-700 sm:block" />

              <div className="flex items-center gap-4 text-sm">
                <Link
                  href="/terms"
                  className="text-neutral-400 underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
                >
                  Terms of Service
                </Link>
                <div className="h-1 w-1 rounded-full bg-neutral-700" />
                <Link
                  href="/privacy"
                  className="text-neutral-400 underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Right Side - Social & Copyright */}
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="text-sm text-neutral-400">
                © 2025 Sanjid. All rights reserved.
              </div>

              {/* Social Links */}
              {/* <SocialShare /> */}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

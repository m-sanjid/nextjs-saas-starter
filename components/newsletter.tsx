"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, X, Loader2 } from "lucide-react";

interface NewsletterState {
  email: string;
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function Newsletter() {
  const [state, setState] = useState<NewsletterState>({
    email: "",
    status: "idle",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.email || !state.email.includes("@")) {
      setState((prev) => ({
        ...prev,
        status: "error",
        message: "Please enter a valid email address",
      }));
      return;
    }

    setState((prev) => ({ ...prev, status: "loading", message: "" }));

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setState((prev) => ({
          ...prev,
          status: "success",
          message: "Successfully subscribed!",
          email: "",
        }));
      } else {
        setState((prev) => ({
          ...prev,
          status: "error",
          message: data.error || "Something went wrong",
        }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "error",
        message: "Network error. Please try again.",
      }));
    }

    // Reset status after 3 seconds
    setTimeout(() => {
      setState((prev) => ({ ...prev, status: "idle", message: "" }));
    }, 3000);
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
    blur: {
      scale: 1,
      boxShadow: "0 0 0 0px rgba(0, 0, 0, 0)",
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
    loading: {
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    success: {
      rotate: 360,
      scale: 1.2,
      transition: { duration: 0.5 },
    },
    error: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black"
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Mail className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="mb-2 text-3xl font-bold text-black">Stay Updated</h2>
          <p className="text-sm text-gray-600">
            Get the latest news and updates delivered to your inbox
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="relative">
            <motion.input
              type="email"
              placeholder="Enter your email address"
              value={state.email}
              onChange={(e) =>
                setState((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-black placeholder-gray-400 transition-colors duration-200 focus:border-black focus:outline-none"
              variants={inputVariants}
              whileFocus="focus"
              initial="blur"
              disabled={state.status === "loading"}
            />

            {/* Input Status Icons */}
            <AnimatePresence>
              {state.status !== "idle" && state.status !== "loading" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                >
                  {state.status === "success" ? (
                    <motion.div variants={iconVariants} animate="success">
                      <Check className="h-5 w-5 text-green-600" />
                    </motion.div>
                  ) : (
                    <motion.div variants={iconVariants} animate="error">
                      <X className="h-5 w-5 text-red-600" />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            disabled={state.status === "loading"}
            className="flex w-full items-center justify-center space-x-2 rounded-lg bg-black px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            variants={buttonVariants}
            animate={state.status === "loading" ? "loading" : "idle"}
            whileHover={state.status !== "loading" ? "hover" : undefined}
            whileTap={state.status !== "loading" ? "tap" : undefined}
          >
            <AnimatePresence mode="wait">
              {state.status === "loading" ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Subscribing...</span>
                </motion.div>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Subscribe to Newsletter
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>

        {/* Status Messages */}
        <AnimatePresence>
          {state.message && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 rounded-lg p-3 text-center text-sm ${
                state.status === "success"
                  ? "border border-green-200 bg-green-50 text-green-800"
                  : "border border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {state.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-xs text-gray-400">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

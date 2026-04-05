"use client"

import { useRouter } from "@bprogress/next/app"
import { CornerDownLeftIcon, LoaderCircleIcon } from "lucide-react"
import React, { useCallback, useMemo, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { CommandDialog, CommandInput } from "@/components/ui/command"
import { trackEvent } from "@/lib/events"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Kbd, KbdGroup } from "./ui/kbd"

const SUGGESTIONS = [
  "What projects has Abhishek built?",
  "Tell me about Abhishek's internships.",
  "What is Abhishek studying?",
  "What is Abhishek building on GitHub?",
  "What certifications does Abhishek have?",
  "How can I contact Abhishek?",
]

type AskResponse = {
  answer: string
}

export function CommandMenu({
  enabledHotkeys = false,
}: {
  docs?: unknown
  blocks?: unknown
  enabledHotkeys?: boolean
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useHotkeys(
    "mod+k, slash",
    (e) => {
      e.preventDefault()
      setOpen((value) => !value)
    },
    { enabled: enabledHotkeys }
  )

  const placeholder = useMemo(() => "Ask anything about Abhishek…", [])

  const askAI = useCallback(
    async (input: string) => {
      const trimmed = input.trim()
      if (!trimmed || isLoading) return

      setIsLoading(true)
      setError("")
      setAnswer("")

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "ask_about_me",
          question: trimmed,
        },
      })

      try {
        const res = await fetch("/api/ask-about-me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: trimmed }),
        })

        const data = (await res.json()) as AskResponse & { error?: string }

        if (!res.ok) {
          throw new Error(data.error || "Failed to get response.")
        }

        setAnswer(data.answer)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to get response."
        setError(message)
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading]
  )

  const handleOpen = useCallback(() => {
    setOpen(true)
    trackEvent({
      name: "open_command_menu",
      properties: {
        method: "click",
      },
    })
  }, [])

  return (
    <>
      <CommandMenuTrigger onClick={handleOpen} />

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Ask Abhishek"
        description="AI-powered ask-about-me search."
      >
        <CommandInput
          placeholder={placeholder}
          value={question}
          onValueChange={setQuestion}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              void askAI(question)
            }
          }}
        />

        <div className="space-y-4 p-4">
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="motion-surface motion-press rounded-full border border-line bg-background px-3 py-1.5 text-left text-sm text-muted-foreground hover:bg-accent-muted hover:text-foreground"
                onClick={() => {
                  setQuestion(suggestion)
                  void askAI(suggestion)
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-line bg-muted/15 p-4">
            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LoaderCircleIcon className="size-4 animate-spin" />
                AI is thinking…
              </div>
            ) : answer ? (
              <div className="space-y-3">
                <p className="text-sm leading-6 whitespace-pre-wrap text-foreground">
                  {answer}
                </p>
                <button
                  type="button"
                  className="text-sm font-medium text-link underline underline-offset-4"
                  onClick={() => {
                    setOpen(false)
                    router.push("/#connect")
                  }}
                >
                  Contact Abhishek
                </button>
              </div>
            ) : error ? (
              <p className="text-sm leading-6 text-destructive">{error}</p>
            ) : (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Ask about projects, GitHub work, education, internships,
                  certifications, skills, or contact details.
                </p>
                <p className="flex items-center gap-2">
                  <CornerDownLeftIcon className="size-4" />
                  Press Enter to ask AI.
                </p>
              </div>
            )}
          </div>
        </div>
      </CommandDialog>
    </>
  )
}

function CommandMenuTrigger({ ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="command-menu-trigger"
      className="gap-1.5 rounded-full text-muted-foreground shadow-none select-none hover:bg-background hover:text-muted-foreground dark:hover:bg-input/30"
      variant="outline"
      size="sm"
      {...props}
    >
      <Icons.search />

      <span className="font-sans text-sm/4 font-medium sm:hidden">Ask…</span>

      <KbdGroup className="hidden sm:in-[.os-macos_&]:flex">
        <Kbd className="w-5 min-w-5">⌘</Kbd>
        <Kbd className="w-5 min-w-5">K</Kbd>
      </KbdGroup>

      <KbdGroup className="hidden sm:not-[.os-macos_&]:flex">
        <Kbd>Ctrl</Kbd>
        <Kbd className="w-5 min-w-5">K</Kbd>
      </KbdGroup>
    </Button>
  )
}

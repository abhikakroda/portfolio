"use client"

import { useRouter } from "@bprogress/next/app"
import { CornerDownLeftIcon, LoaderCircleIcon } from "lucide-react"
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
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
  const abortControllerRef = useRef<AbortController | null>(null)
  const requestIdRef = useRef(0)

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
      requestIdRef.current += 1
      const requestId = requestIdRef.current
      abortControllerRef.current?.abort()
      const controller = new AbortController()
      abortControllerRef.current = controller

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
          signal: controller.signal,
        })

        const data = (await res.json()) as AskResponse & { error?: string }

        if (!res.ok) {
          throw new Error(data.error || "Failed to get response.")
        }

        if (requestId === requestIdRef.current) {
          setAnswer(data.answer)
        }
      } catch (err) {
        if (controller.signal.aborted) {
          return
        }

        const message =
          err instanceof Error ? err.message : "Failed to get response."
        if (requestId === requestIdRef.current) {
          setError(message)
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false)
        }
      }
    },
    [isLoading]
  )

  useEffect(() => {
    if (!open) {
      abortControllerRef.current?.abort()
      setIsLoading(false)
    }
  }, [open])

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
        className="max-h-[min(80vh,720px)] overflow-hidden sm:max-w-2xl"
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

        <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
          {!answer && !isLoading ? (
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="motion-surface motion-press rounded-full border border-line bg-background px-3 py-1.5 text-left text-sm text-muted-foreground hover:bg-accent-muted hover:text-foreground dark:border-transparent dark:bg-muted/40"
                  onClick={() => {
                    setQuestion(suggestion)
                    void askAI(suggestion)
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-line bg-muted/15 p-4">
            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LoaderCircleIcon className="size-4 animate-spin" />
                AI is thinking…
              </div>
            ) : answer ? (
              <div className="space-y-3">
                <div className="prose prose-sm max-w-none text-foreground dark:prose-invert prose-p:my-2 prose-a:text-link prose-strong:text-foreground prose-ol:my-2 prose-ul:my-2 prose-li:my-0.5">
                  <AskMarkdown text={answer} />
                </div>
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
                  certifications, skills, contact details, or general software
                  and AI questions.
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

function AskMarkdown({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\s*\n/)

  return blocks.map((block, blockIndex) => {
    const lines = block
      .split("\n")
      .map((line) => line.trimEnd())
      .filter(Boolean)

    if (!lines.length) {
      return null
    }

    if (lines.every((line) => /^- /.test(line))) {
      return (
        <ul key={blockIndex}>
          {lines.map((line, lineIndex) => (
            <li key={lineIndex}>
              {renderInlineMarkdown(line.replace(/^- /, ""))}
            </li>
          ))}
        </ul>
      )
    }

    if (lines.every((line) => /^\d+\.\s/.test(line))) {
      return (
        <ol key={blockIndex}>
          {lines.map((line, lineIndex) => (
            <li key={lineIndex}>
              {renderInlineMarkdown(line.replace(/^\d+\.\s/, ""))}
            </li>
          ))}
        </ol>
      )
    }

    return (
      <p key={blockIndex}>
        {lines.map((line, lineIndex) => (
          <Fragment key={lineIndex}>
            {lineIndex > 0 ? <br /> : null}
            {renderInlineMarkdown(line)}
          </Fragment>
        ))}
      </p>
    )
  })
}

function renderInlineMarkdown(text: string) {
  const nodes: React.ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\((https?:\/\/[^)]+)\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]

    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(<strong key={nodes.length}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith("`") && token.endsWith("`")) {
      nodes.push(
        <code
          key={nodes.length}
          className="rounded bg-muted px-1 py-0.5 font-mono text-[0.92em]"
        >
          {token.slice(1, -1)}
        </code>
      )
    } else {
      const parts = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/)
      if (parts) {
        nodes.push(
          <a
            key={nodes.length}
            href={parts[2]}
            target="_blank"
            rel="nofollow noopener"
          >
            {parts[1]}
          </a>
        )
      } else {
        nodes.push(token)
      }
    }

    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
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

      <span className="font-sans text-sm/4 font-medium">Ask about me</span>

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

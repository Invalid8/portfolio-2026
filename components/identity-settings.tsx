"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { useCmsAuth, usePageContext } from "@dalgoridim/headless-cms/client";
import { useIdentity, type Identity } from "@/components/identity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type IdentityForm = Pick<
  Identity,
  "name" | "handle" | "role" | "email" | "phone" | "calendar" | "resume"
> & {
  available: boolean;
};

function toForm(identity: Identity): IdentityForm {
  return {
    name: identity.name ?? "",
    handle: identity.handle ?? "",
    role: identity.role ?? "",
    email: identity.email ?? "",
    phone: identity.phone ?? "",
    calendar: identity.calendar ?? "",
    resume: identity.resume ?? "",
    available: Boolean(identity.available),
  };
}

function FieldLabel({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

export function IdentitySettings() {
  const { isAdmin, isEditing } = useCmsAuth();
  const { editField } = usePageContext();
  const identity = useIdentity();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<IdentityForm>(() => toForm(identity));

  if (!isAdmin || !isEditing) return null;

  function set<K extends keyof IdentityForm>(key: K, value: IdentityForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function applyChanges() {
    for (const [key, value] of Object.entries(form)) {
      editField("portfolio", "identity", key, value);
    }
    setOpen(false);
  }

  return (
    <>
      <Button
        type="button"
        size="icon-lg"
        variant="secondary"
        aria-label="Edit identity settings"
        title="Identity settings"
        onClick={() => {
          setForm(toForm(identity));
          setOpen(true);
        }}
      >
        <Settings className="size-4" />
      </Button>
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (nextOpen) setForm(toForm(identity));
          setOpen(nextOpen);
        }}
      >
        <DialogContent className="gap-5 p-6 sm:max-w-xl sm:p-8">
          <DialogHeader>
            <DialogTitle>Identity settings</DialogTitle>
            <DialogDescription>
              Update profile details used across links, metadata, and
              signatures.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 sm:grid-cols-2">
            <FieldLabel label="Name">
              <Input
                value={form.name}
                onChange={(event) => set("name", event.target.value)}
                placeholder="Daniel Fadamitan"
              />
            </FieldLabel>
            <FieldLabel label="Handle">
              <Input
                value={form.handle}
                onChange={(event) => set("handle", event.target.value)}
                placeholder="dalgoridim"
              />
            </FieldLabel>
            <FieldLabel label="Role">
              <Input
                value={form.role}
                onChange={(event) => set("role", event.target.value)}
                placeholder="Frontend Developer"
              />
            </FieldLabel>
            <FieldLabel label="Email">
              <Input
                type="email"
                value={form.email}
                onChange={(event) => set("email", event.target.value)}
                placeholder="you@example.com"
              />
            </FieldLabel>
            <FieldLabel label="Phone">
              <Input
                value={form.phone}
                onChange={(event) => set("phone", event.target.value)}
                placeholder="+1 000 000 0000"
              />
            </FieldLabel>
            <FieldLabel label="Availability">
              <span className="flex min-h-12 items-center gap-2 rounded-lg border border-input px-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(event) => set("available", event.target.checked)}
                  className="size-4 accent-lime"
                />
                Available
              </span>
            </FieldLabel>
            <FieldLabel label="Calendar URL" className="sm:col-span-2">
              <Input
                type="url"
                value={form.calendar}
                onChange={(event) => set("calendar", event.target.value)}
                placeholder="https://calendly.com/..."
              />
            </FieldLabel>
            <FieldLabel label="Resume URL" className="sm:col-span-2">
              <Input
                type="url"
                value={form.resume}
                onChange={(event) => set("resume", event.target.value)}
                placeholder="https://..."
              />
            </FieldLabel>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={applyChanges}>
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { SaveButton } from "@/components/save-button";
import { EditToggle } from "@/components/edit-toggle";
import { IdentitySettings } from "@/components/identity-settings";

/**
 * Floating bottom-right control cluster: the universal Edit toggle (available to
 * everyone for local preview edits) plus a Save button that surfaces for a
 * signed-in admin with pending changes.
 */
export function AdminBar({ showEdit = true }: { showEdit?: boolean }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <IdentitySettings />
      {showEdit && <EditToggle />}
      <SaveButton />
    </div>
  );
}

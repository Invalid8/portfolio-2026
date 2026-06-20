import { SaveButton } from "@/components/save-button";
import { EditToggle } from "@/components/edit-toggle";

/**
 * Floating bottom-right control cluster: the universal Edit toggle (available to
 * everyone for local preview edits) plus a Save button that surfaces for a
 * signed-in admin with pending changes.
 */
export function AdminBar() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <EditToggle />
      <SaveButton />
    </div>
  );
}

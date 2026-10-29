import { getMessages } from "@/lib/actions/messageActions";
import LoginForm from "./LoginForm";
import LogoutButton from "./LogoutButton";

// Always fetch fresh data on each request so newly received messages and the
// current authentication state are reflected immediately.
export const dynamic = "force-dynamic";

type MessageRow = {
  id: string;
  name: string;
  email?: string | null;
  message: string;
  contactno: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

function formatDate(date?: Date | string) {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

export default async function MessagesPage() {
  // Fetch messages through the admin-protected Server Action instead of
  // touching the database directly from this page.
  const result = await getMessages();

  // The Server Action is admin-protected and returns either an error/auth
  // shape or a success-with-data shape. Narrow on the presence of `data`.
  if (!("data" in result)) {
    const errorMessage =
      (result as { error?: string }).error ??
      "Authentication required to view messages.";

    return (
      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Messages</h1>
          <p className="mt-1 text-sm text-gray-600">{errorMessage}</p>
        </div>
        <LoginForm />
      </main>
    );
  }

  const messages: MessageRow[] = result.data;

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Messages</h1>
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
            Total: {messages.length}
          </span>
          <LogoutButton />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact No</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {messages.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No messages found.
                </td>
              </tr>
            ) : (
              messages.map((m, i) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                    {m.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <a
                      href={`tel:${m.contactno}`}
                      className="text-blue-600 hover:underline"
                    >
                      {m.contactno}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {m.email ? (
                      <a
                        href={`mailto:${m.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {m.email}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="max-w-md whitespace-pre-wrap break-words px-4 py-3 text-gray-700">
                    {m.message}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                    {formatDate(m.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

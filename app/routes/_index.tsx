import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const API_URL = "http://localhost:5000";

const fetchUsers = async () => {
  return fetch(`${API_URL}/users`).then((res) => res.json());
};

export const loader = async () => {
  const users = (await fetchUsers()) as { id: string; name: string }[];
  return json({ users });
};

export default function Index() {
  const { users } = useLoaderData<typeof loader>();

  console.debug({ users });

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}.</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <a
        href="/add-user"
        className="bg-white px-3 text-black rounded-md p-2 mt-5"
      >
        New User
      </a>
    </div>
  );
}

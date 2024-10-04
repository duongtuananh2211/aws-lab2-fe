import { json, type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const API_URL = "http://app:5000";

export default function Index() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = JSON.stringify(Object.fromEntries(formData));

    console.debug({ body });
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Adjust to your specific origin
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    const method = "POST";
    const response = await fetch(`${API_URL}/users`, {
      method,
      headers,
      body,
    });
    const data = await response.json();

    alert("Create success");

    // Redirect to the home page
    window.location.href = "/";
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 max-w-96 mx-auto mt-10"
        >
          <input
            type="text"
            placeholder="name"
            name="name"
            className="bg-white"
          />

          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
}

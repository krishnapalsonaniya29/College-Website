const stats = [
  { title: "Departments", value: 0 },
  { title: "Faculty", value: 0 },
  { title: "Gallery", value: 0 },
  { title: "Programs", value: 0 },
  { title: "Subjects", value: 0 },
  { title: "News", value: 0 },
  { title: "Events", value: 0 },
  { title: "Admissions", value: 0 },
];

export default function DashboardPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-lg bg-white p-6 shadow"
          >
            <p className="text-gray-500">
              {item.title}
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
}
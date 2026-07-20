interface Department {
  name: string;
  logoUrl: string;
  description: string;
}

interface AboutDepartmentProps {
  department: Department;
}

export default function AboutDepartment({
  department,
}: AboutDepartmentProps) {
  return (
    <section
      id="about"
      className="rounded-xl bg-white p-8 shadow"
    >
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Logo */}
        <div className="flex justify-center md:block">
          <img
            src={department.logoUrl}
            alt={department.name}
            className="h-28 w-28 rounded-xl bg-blue-50 object-contain p-4"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800">
            About Department
          </h2>

          <p className="mt-5 whitespace-pre-line leading-8 text-gray-600">
            {department.description}
          </p>
        </div>
      </div>
    </section>
  );
}
import { Trophy, Heart, Users } from "lucide-react";

const SportsOverview = () => {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Content */}
        <div className="p-8 lg:p-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
            <Trophy size={18} />
            Sports & Physical Education
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Building Champions On and Off the Field
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            The institute strongly believes that sports and physical education
            play a vital role in the overall development of students. Along
            with academic excellence, students are encouraged to participate in
            various indoor and outdoor sports to develop leadership, teamwork,
            discipline, confidence, and a healthy lifestyle.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Throughout the academic year, the college organizes annual sports
            meets, inter-department competitions, and encourages participation
            in university, state, and national-level tournaments. Our sports
            facilities provide students with an excellent platform to showcase
            their talent and achieve success.
          </p>

          {/* Highlights */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4 text-center">
              <Heart className="mx-auto mb-2 text-blue-900" size={28} />
              <h3 className="font-semibold text-slate-900">
                Fitness
              </h3>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-center">
              <Users className="mx-auto mb-2 text-blue-900" size={28} />
              <h3 className="font-semibold text-slate-900">
                Teamwork
              </h3>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-center">
              <Trophy className="mx-auto mb-2 text-blue-900" size={28} />
              <h3 className="font-semibold text-slate-900">
                Excellence
              </h3>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="h-full">
          <img
            src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=80"
            alt="Sports"
            className="h-full min-h-[400px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default SportsOverview;
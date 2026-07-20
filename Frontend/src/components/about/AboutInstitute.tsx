import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface AboutData {
  instituteName: string;

  about: string;
  motto: string;
  vision: string;
  mission: string;
  objectives: string;

  principalName: string;
  principalPhotoUrl: string;
  principalMessage: string;
}

interface Props {
  data: AboutData;
}

const AboutInstitute = ({ data }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* About Institute */}
      <section
        id="about"
        className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-800">
          About the Institute
        </span>

        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          {data.instituteName}
        </h2>

        <div className="mt-4 h-1 w-20 rounded-full bg-amber-400"></div>

        <p className="mt-6 whitespace-pre-line leading-8 text-gray-700">
          {data.about}
        </p>
      </section>

      {/* Motto */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-8">
        <h3 className="mb-4 text-2xl font-bold text-blue-900">
          Institute Motto
        </h3>

        <p className="whitespace-pre-line text-lg italic leading-8 text-blue-800">
          {data.motto}
        </p>
      </section>

      {/* Vision */}
      <section
        id="vision"
        className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <h3 className="mb-4 text-2xl font-bold text-slate-900">
          Vision
        </h3>

        <p className="whitespace-pre-line leading-8 text-gray-700">
          {data.vision}
        </p>
      </section>

      {/* Mission */}
      <section
        id="mission"
        className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <h3 className="mb-4 text-2xl font-bold text-slate-900">
          Mission
        </h3>

        <p className="whitespace-pre-line leading-8 text-gray-700">
          {data.mission}
        </p>
      </section>

      {/* Objectives */}
      <section
        id="objectives"
        className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <h3 className="mb-4 text-2xl font-bold text-slate-900">
          Objectives
        </h3>

        <p className="whitespace-pre-line leading-8 text-gray-700">
          {data.objectives}
        </p>
      </section>

      {/* Principal Message */}
      <section
        id="principal"
        className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex justify-center md:w-72 md:flex-shrink-0">
            {data.principalPhotoUrl ? (
              <img
                src={data.principalPhotoUrl}
                alt={data.principalName}
                className="h-80 w-64 rounded-xl border object-cover shadow"
              />
            ) : (
              <div className="flex h-80 w-64 items-center justify-center rounded-xl border bg-gray-100">
                <GraduationCap
                  size={80}
                  className="text-gray-400"
                />
              </div>
            )}
          </div>

          <div className="flex-1">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-800">
              Principal's Message
            </span>

            <h3 className="mt-2 text-3xl font-bold text-slate-900">
              {data.principalName}
            </h3>

            <div className="mt-4 h-1 w-20 rounded-full bg-amber-400"></div>

            <p className="mt-6 whitespace-pre-line leading-8 text-gray-700">
              {data.principalMessage}
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutInstitute;
import { motion } from "framer-motion";

function MainHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white"
    >
      <div className="mx-auto flex max-w-[1350px] items-center justify-between px-6 py-4">

        {/* Left Logo */}
        <div className="group cursor-pointer">
          <div className="overflow-hidden rounded-full border-2 border-transparent transition-all duration-300 group-hover:border-blue-600 group-hover:shadow-lg">
            <img
              src="/images/logo.png"
              alt="Institute Logo"
              className="h-20 w-20 object-cover"
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 px-8 text-center">
          <h1 className="font-serif text-[1.8rem] font-bold text-blue-700">
            Institute for Excellence in Higher Education (IEHE), Bhopal
          </h1>

          <p className="mt-2 text-[15px] text-black">
            An Autonomous Institute established by Govt. of M.P.
            <span className="font-medium">
              (College with Potential for Excellence Status Conferred by UGC)
            </span>
          </p>

          <p className="mt-1 text-[12px] text-red-700">
            Accredited by <span className="font-semibold">NAAC</span> as
            <span className="font-bold"> 'A+' Grade Institute </span>
            in the Fourth Cycle.
          </p>
        </div>

        {/* Right Logo */}
        <div className="group cursor-pointer">
          <div className="overflow-hidden rounded-full border-2 border-transparent transition-all duration-300 group-hover:border-yellow-500 group-hover:shadow-lg">
            <img
              src="/images/naac.png"
              alt="NAAC Logo"
              className="h-20 w-20 object-cover"
            />
          </div>
        </div>

      </div>
    </motion.header>
  );
}

export default MainHeader;
import { motion } from "framer-motion";
import image1 from "../../assets/images/college_logo.png";
import image2 from "../../assets/images/naac_logo.jpg";
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
              src={image1}
              alt="Institute Logo"
              className="h-25 w-20 object-cover"
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 px-8 text-center">
          <h1 className="font-serif text-[1.8rem] font-bold text-blue-700">
            Mata Jijabai Govt. (Autonomous) PG Girls College, Indore
          </h1>

          <p className="mt-2 text-[15px] text-black">
            An Autonomous Institute established in 1962 under the M.P. Higher Education Department
            <span className="font-medium">
              (College with Potential for Excellence Status Conferred by UGC)
            </span>
          </p>

          <p className="mt-1 text-[12px] text-red-700">
            Affiliated to Devi Ahilya Vishwavidyalaya, Indore (M.P.) | NAAC Accredited with 'A' Grade
          </p>
        </div>

        {/* Right Logo */}
        <div className="group cursor-pointer">
          <div className="overflow-hidden rounded-full border-2 border-transparent transition-all duration-300 group-hover:border-yellow-500 group-hover:shadow-lg">
            <img
              src={image2}
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
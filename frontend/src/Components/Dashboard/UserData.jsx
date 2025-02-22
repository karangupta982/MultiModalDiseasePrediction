

import { User, Mail, Calendar, Activity, AlertTriangle, Pencil } from "lucide-react"
import ImageModal from "../ImageModal"
import { useSelector } from "react-redux"
import { useState } from "react"

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {user} = useSelector((state) => state.profile)

  // console.log("user from userDatafile:",user);
  const userData = {
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "john@example.com",
    gender: user?.gender || "Male",
    dateOfBirth: user?.dateOfBirth || "1990-01-01",
    image: user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`,
    disease: user?.disease || "None",
    allergies: user?.allergies || "None",
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white text-black shadow-2xl transition-all duration-300 hover:shadow-2xl">
      {/* Background gradient decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />

      <div className="relative p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Profile Image Section with enhanced styling */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur group-hover:opacity-100 transition duration-300" />
              <div className="relative">
                <img
                  src={userData.image || "/placeholder.svg"}
                  alt="Profile"
                  className="w-36 h-36 rounded-full border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg" />
                {/* <img src={Edit} alt="" className="forced-color-adjust-auto absolute top-2 text-black w-4 h-4" /> */}
                {/* <Pencil className="cursor-pointer translate-y-[2vh]" /> */}
                <Pencil className="cursor-pointer translate-y-[2vh]" onClick={() => setIsModalOpen(true)}/>
              </div>
            </div>
          </div>

          {/* User Details Section with enhanced layout */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h2 className="text-5xl font-bold bg-gradient-to-r text-black from-primary to-secondary bg-clip-text">
                {`${userData.firstName} ${userData.lastName}`}
              </h2>
            </div>

            {/* Info grid with glassmorphism effect */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Mail, label: "Email", value: userData.email },
                { icon: User, label: "Gender", value: userData.gender },
                { icon: Calendar, label: "Date of Birth", value: new Date(userData.dateOfBirth).toLocaleDateString() },
                { icon: Activity, label: "Disease", value: userData.disease },
                { icon: AlertTriangle, label: "Allergies", value: userData.allergies },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary/5 backdrop-blur-sm transition-all duration-300 hover:bg-secondary/10"
                >
                  <item.icon className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="text-gray-600 truncate text-lg">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (<ImageModal setIsModalOpen={setIsModalOpen}/>)}
    </div>
  )
}

export default UserProfile


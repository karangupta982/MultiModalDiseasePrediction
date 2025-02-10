// import React from 'react';
// // import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { User, Mail, Phone, Calendar, Info } from 'lucide-react';

// const UserProfile = ({ user }) => {
//   // Example user data structure
//   const userData = {
//     firstName: user?.firstName || 'John',
//     lastName: user?.lastName || 'Doe',
//     email: user?.email || 'john@example.com',
//     gender: user?.gender || 'Male',
//     dob: user?.dob || '1990-01-01',
//     about: user?.about || 'Healthcare enthusiast committed to preventive care',
//     contact: user?.contact || '+1 234 567 8900',
//     image: user?.image || '/api/placeholder/150/150'
//   };

//   return (
//     <div className="bg-white shadow-lg">
//       <div className="p-6">
//         <div className="flex flex-col md:flex-row items-center gap-6">
//           {/* Profile Image Section */}
//           <div className="flex flex-col items-center space-y-4">
//             <div className="relative">
//               <img
//                 src={userData.image}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full border-4 border-secondary shadow-md"
//               />
//               <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
//             </div>
//           </div>

//           {/* User Details Section */}
//           <div className="flex-1 space-y-4">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {`${userData.firstName} ${userData.lastName}`}
//               </h2>
//               <p className="text-secondary">Patient ID: {user?.id || '#12345'}</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Mail className="w-5 h-5 text-secondary" />
//                 <span>{userData.email}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Phone className="w-5 h-5 text-secondary" />
//                 <span>{userData.contact}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <User className="w-5 h-5 text-secondary" />
//                 <span>{userData.gender}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Calendar className="w-5 h-5 text-secondary" />
//                 <span>{new Date(userData.dob).toLocaleDateString()}</span>
//               </div>
//             </div>

//             <div className="flex items-start gap-2 text-gray-600">
//               <Info className="w-5 h-5 text-secondary mt-1" />
//               <p className="flex-1">{userData.about}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

























// import { User, Mail, Phone, Calendar, Info } from "lucide-react"
// import { useDispatch, useSelector } from "react-redux"


// const UserProfile = () => {
//   const dispatch = useDispatch()
//   const {user} = useSelector((state) => state.profile)

  

//   const userData = {
//     firstName: user?.firstName || "firstname",
//     lastName: user?.lastName || "Lastname",
//     email: user?.email || "xyz@example.com",
//     gender: user?.gender || "Male",
//     dob: user?.dob || "1990-01-01",
//     // about: user?.about || "Healthcare enthusiast committed to preventive care",
//     // contact: user?.contact || "+1 234 567 8900",
//     image: user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`,
//   }

//   return (
//     <div className="relative overflow-hidden rounded-2xl bg-white  text-black shadow-2xl transition-all duration-300 hover:shadow-2xl">
//       {/* Background gradient decoration */}
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />

//       <div className="relative p-8">
//         <div className="flex flex-col md:flex-row items-start gap-8">
//           {/* Profile Image Section with enhanced styling */}
//           <div className="flex flex-col items-center space-y-4">
//             <div className="relative group">
//               <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur group-hover:opacity-100 transition duration-300" />
//               <div className="relative">
//                 <img
//                   src={userData.image || "/placeholder.svg"}
//                   alt="Profile"
//                   className="w-36 h-36 rounded-full border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105"
//                 />
//                 <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg" />
//               </div>
//             </div>
//           </div>

//           {/* User Details Section with enhanced layout */}
//           <div className="flex-1 space-y-6">
//             <div className="space-y-2">
//               <h2 className="text-5xl font-bold bg-gradient-to-r text-black from-primary to-secondary bg-clip-text ">
//                 {`${userData.firstName} ${userData.lastName}`}
//               </h2>
//               {/* <p className="text-secondary/80 font-medium">Patient ID: {user?.id || "#12345"}</p> */}
//             </div>

//             {/* Info grid with glassmorphism effect */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[
//                 { icon: Mail, value: userData.email },
//                 { icon: Phone, value: userData.contact },
//                 { icon: User, value: userData.gender },
//                 { icon: Calendar, value: new Date(userData.dob).toLocaleDateString() },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-3 p-4 rounded-xl bg-secondary/5 backdrop-blur-sm transition-all duration-300 hover:bg-secondary/10"
//                 >
//                   <item.icon className="w-5 h-5 text-primary shrink-0" />
//                   <span className="text-gray-600 truncate text-xl">{item.value}</span>
//                 </div>
//               ))}
//             </div>

//             {/* About section with decorative border */}
//             <div className="relative p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5">
//               <div className="absolute inset-0 border-2 border-primary/10 rounded-xl" />
//               <div className="flex items-start gap-3">
//                 <Info className="w-5 h-5 text-primary mt-1 shrink-0" />
//                 <p className="text-gray-600 relative">{userData.about}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserProfile















import { User, Mail, Calendar, Activity, AlertTriangle, Pencil } from "lucide-react"
import ImageModal from "../ImageModal"
import { useSelector } from "react-redux"
import { useState } from "react"

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {user} = useSelector((state) => state.profile)

  console.log("user from userDatafile:",user);
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


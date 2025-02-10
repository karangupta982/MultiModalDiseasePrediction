// import { useEffect } from "react"
// import { useState } from "react"

// import { RxCross2 } from "react-icons/rx"

// import { useSelector } from "react-redux"

// import { createReview } from "../Service/Operation/courseDetailsAPI"


// export default function ImageModal({ seIsModalOpen }) {
//   const { user } = useSelector((state) => state.profile)
// //   const { token } = useSelector((state) => state.auth)
// //   const { courseEntireData } = useSelector((state) => state.viewCourse)

// //   const {
// //     register,
// //     handleSubmit,
// //     setValue,
// //     formState: { errors },
// //   } = useForm()

// //   useEffect(() => {
// //     setValue("courseExperience", "")
// //     setValue("courseRating", 0)
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [])

// //   const ratingChanged = (newRating) => {
// //     // console.log(newRating)
// //     setValue("courseRating", newRating)
// //   }

// //   const onSubmit = async (data) => {
// //     // await createReview(
// //     //   {
// //     //     // rating: data.courseRating,
// //     //     // review: data.courseExperience, 
// //     //   },
// //     //   token
// //     // )
// //     setReviewModal(false)
// //   }

//   return (
//     <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
//       <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
//         {/* Modal Header */}
        // <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
        //    <p className="text-xl font-semibold text-richblack-5">Upload Photo</p>
        //   <button onClick={() => seIsModalOpen(false)}>
        //     <RxCross2 className="text-2xl text-richblack-5" />
        //   </button>
        // </div>
//         {/* Modal Body */}
//         <div className="p-6 ">
//           <div className="flex items-center justify-start gap-x-4">
//             <img
//               src={user?.image}
//               alt={user?.firstName + "profile"}
//               className="aspect-square w-[50px] rounded-full object-cover"
//             />
//             <div className="">
//               <p className="font-semibold text-2xl text-richblack-5">
//                 {user?.firstName} {user?.lastName}
//               </p>
              
              
//               {/* <p className="text-sm text-richblack-5">Posting Publicly</p> */}
//             </div>
//           </div>
//           <p className="mt-[2vh] ml-[3.5vw]">Change You photo.</p>

//           <div className="w-full text-center">
//           <button className="px-[2vw] py-[1.5vh] mt-[10vh] rounded-xl bg-blue-500 w-fit" onClick={}>Upload</button>
//           </div>
//           {/* <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="mt-6 flex flex-col items-center"
//           >
           
//             <div className="flex w-11/12 flex-col space-y-2">
//               <label
//                 className="text-sm text-richblack-5"
//                 htmlFor="courseExperience"
//               >
//                 Add Your Experience <sup className="text-pink-200">*</sup>
//               </label>
//               <textarea
//                 id="courseExperience"
//                 placeholder="Add Your Experience"
//                 {...register("courseExperience", { required: true })}
//                 className="form-style resize-x-none min-h-[130px] w-full"
//               />
//               {errors.courseExperience && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                   Please Add Your Experience
//                 </span>
//               )}
//             </div>
//             <div className="mt-6 flex w-11/12 justify-end gap-x-2">
//               <button
//                 onClick={() => setReviewModal(false)}
//                 className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
//               >
//                 Cancel
//               </button>
//               <button text="Save" />
//             </div>
//           </form> */}
//         </div>
//       </div>
//     </div>

   
//   )
// }



















import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { GrInProgress } from "react-icons/gr"
import { updateDisplayPicture } from "../Service/Operation/settingsAPI.js"
import IconBtn from "./IconBtn.jsx"
import { RxCross2 } from "react-icons/rx"

export default function ChangeProfilePicture({setIsModalOpen}) {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      // console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      // console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])
  return (
    <div className="absolute inset-0  backdrop-blur-sm bg-richblack-900 bg-opacity-50 pt-[10vh]">
        <div className="flex items-center justify-between w-[40vw] mx-auto rounded-t-lg bg-richblack-700 p-5">
           <p className="text-xl font-semibold text-richblack-5">Upload Photo</p>
          <button onClick={() => setIsModalOpen(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
         <div className='flex items-center justify-between rounded-md border w-[40vw] mx-auto border-richblack-700 bg-richblack-800 p-8 px-2 md:px-12'>
         
            <div className='flex gap-x-4 items-center ' >

                


                <div>
                <img src={previewSource || user?.image}
                    alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[60px] md:w-[78px] rounded-full object-cover' />
                </div>

                <div className='space-y-2'>
                <h2 className='lg:text-lg text-md font-semibold text-richblack-5 uppercase tracking-wider'>Change Profile Picture</h2>
                <div className='flex gap-x-3' >

                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className='hidden'
                    accept='image/jpeg, image/gif image/jpg image/png' />

                    <button onClick={handleClick} disabled={loading} className={` bg-richblack-600 text-richblack-50 lg:py-2 py-1 lg:px-5 px-2 font-semibold rounded-md uppercase tracking-wider 
                ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}
                `} >Select</button>


                    <IconBtn text={loading ? 'Uploading...' : 'Upload'}
                    onClickHandler={handleFileUpload}
                    customClasses='lg:py-2 lg:px-5'
                    disabled={loading}>
                    {
                        !loading ?
                        <FiUpload className='text-lg text-richblack-900' />
                        :
                        <GrInProgress className='text-lg text-richblack-900' />
                    }
                    </IconBtn>

                    {/* <button className="bg-richblack-600 text-richblack-50 lg:py-2 py-1 lg:px-5 px-2 font-semibold rounded-md uppercase tracking-wider"
                    onClick={handleFileUpload}
                    disabled={loading}
                    >
                    {
                        !loading ?
                        <FiUpload className='text-lg text-richblack-900' />
                        :
                        <GrInProgress className='text-lg text-richblack-900' />
                    }
                    {
                        loading ? 'Uploading...' : 'Upload'
                    }
                    </button> */}

                </div>
                </div>
            </div>
        </div>
    </div>
   
  )
}

import React, { useState,useEffect } from 'react';
import {FilePenLineIcon, Loader, LoaderCircleIcon, PenBoxIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon} from "lucide-react";
import { useNavigate } from 'react-router';
import {useSelector} from "react-redux";
import axiosClient from "../configs/axiosClient";
import pdfToText from "react-pdftotext";
import toast from 'react-hot-toast';
const Dashboard = () => {

  // const {user,token} = useSelector(state=> state.auth); 
  const {user} = useSelector(state => state.auth);

  const colors=["#9333ea","#d97706","#16a34a","#dc2626","#0284c7"]
  const [allResumes,setAllResumes] = useState([]);
  const [showCreateResume,setShowCreateResume] = useState(false);
  const [showUploadResume,setShowUploadResume] = useState(false);
  const [title,setTitle] = useState('');
  const [resume,setResume] = useState(null);
  const [editResumeId,setEditResumeId]=useState('');
  const [isLoading,setIsLoading] = useState()
  const navigate = useNavigate();

  const loadAllResumes = async() =>{
    try{676
    //   const {data} = await axiosClient.get('/users/resumes',{headers:{
    //   Authorization:token
    //  }});

     const {data} = await axiosClient.get('/users/resumes',{
      withCredentials:true
     });

     setAllResumes(data.resumes);
    }
    catch(error)
    {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  const createResume = async(event)=>{
    try{
    event.preventDefault();
    // const {data} = await axiosClient.post('/resumes/create',{title},{headers:{
    //   Authorization:token
    // }});

     const {data} = await axiosClient.post('/resumes/create',{title},{withCredentials:true});

    setAllResumes([...allResumes,data.resume]);
    setTitle('');
    setShowCreateResume(false);
    navigate(`/app/builder/${data.resume._id}`);
    }
    catch(error)
    {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  const uploadResume = async(event)=>{
    event.preventDefault();
    setIsLoading(true);
    try{
      const ResumeText = await pdfToText(resume);
    //   const {data} = await axiosClient.post('/ai/upload-resume',{title,resumeText: ResumeText},{headers:{
    //   Authorization:token
    //  }});

    const { data } = await axiosClient.post(
      '/ai/upload-resume',
      { title, resumeText: ResumeText },
      { withCredentials: true } 
    );

     setTitle('');
     setResume(null);
     setShowUploadResume(false);
     navigate(`/app/builder/${data.resumeId}`);
    }
    catch(error)
    {
      toast.error(error?.response?.data?.message || error.message);
    }
    
    setIsLoading(false);
  }

  const editTitle = async(event)=>{
    try{
    event.preventDefault();
    // const {data} = await axiosClient.put(`/resumes/update`,{resumeId:editResumeId,resumeData:{title}},{headers:{
    //       Authorization:token
    //     }});

        const { data } = await axiosClient.put(
          '/resumes/update',
          { resumeId: editResumeId, resumeData: { title } },
          { withCredentials: true } 
        );
        setAllResumes(allResumes.map(resume => resume._id === editResumeId ? {...resume,title}:resume));
        setTitle('');
        setEditResumeId('');
        toast.success(data.message);
    }
    catch(error)
    {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  const deleteResume = async(resumeId)=>{
    try{
        const confirm = window.confirm("Are you sure to delete this resume?")

        if(confirm)
        {
        //   const { data } = await axiosClient.delete(`/resumes/delete/${resumeId}`,{headers:{
        //   Authorization:token
        // }});

        const { data } = await axiosClient.delete(`/resumes/delete/${resumeId}`, {
        withCredentials: true, // 
      });

          setAllResumes(allResumes.filter(resume => resume._id !==resumeId ));
          toast.success(data.message);
        }
    }
    catch(error)
    {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  useEffect(()=>{
    loadAllResumes();
  },[])
  // return (
  //   <div>
  //     <div className='max-w-7xl mx-auto px-4 py-8 mt-28'>
  //       <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 
  //       bg-clip-text text-transparent sm:hidden'>Welcome {user.name}</p>

  //       <div className='flex gap-4'>
  //         <button onClick={()=> setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center
  //         rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300
  //         group hover:border-amber-500 hover:shadow-lg transition-all
  //         duration-300 cursor-pointer'>
  //           <PlusIcon className="size-11 transition-all duration-300 p-2.5
  //           bg-gradient-to-br from-amber-300 to-amber-300 text-white rounded-full" />
  //           <p className='text-sm group-hover:text-amber:600 transition-all duration-300'>Create Resume</p>
  //         </button>

  //         <button onClick={()=> setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center
  //         rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300
  //         group hover:border-amber-500 hover:shadow-lg transition-all
  //         duration-300 cursor-pointer'>
  //           <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5
  //           bg-gradient-to-br from-amber-300 to-amber-300 text-white rounded-full" />
  //           <p className='text-sm group-hover:text-amber:600 transition-all duration-300'>Upload Resume</p>
  //         </button>
  //       </div>

  //       <hr className='border-slate-300 my-6 sm:w-[305px]'/>

  //       <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
  //         {
  //           allResumes.map((resume,index)=>{

  //             const baseColor = colors[index% colors.length];

  //             return (
  //               <button key={index} onClick={()=> navigate(`/app/builder/${resume._id}`)}className='relative w-full sm:max-w-36 h-48 flex
  //               flex-col items-center justify-center rounded-lg gap-2 border group
  //               hover:shadow-lg transition-all duration-300 cursor-pointer'
  //               style={{background:`linear-gradient(135deg,${baseColor}10,${baseColor}40)`,borderColor: baseColor + '40'}}>

  //                 <FilePenLineIcon style={{color:baseColor}} className='size-7 group-hover:scale-105 transition-all'/>
  //                 <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{color:baseColor}}>{resume?.title}</p>
  //                 <p className='absolute bottom-1 text-[11px] text-slate-400
  //                 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' 
  //                 style={{color:baseColor + '90'}}>
  //                   Update on {new Date(resume?.updatedAt).toLocaleDateString()}
  //                 </p>

  //                 {/* To delete resume or edit it */}
  //                 <div onClick={e=> e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center sm:hidden'>
  //                   <TrashIcon onClick={()=> deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
  //                   <PenBoxIcon onClick={()=> {setEditResumeId(resume._id); setTitle(resume.title)}}className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
  //                 </div>
  //               </button>
  //             )
  //           })
  //         }
  //       </div>

  //       {
  //         showCreateResume && (
  //           <form onSubmit={createResume}  onClick={()=> setShowCreateResume(false)}className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50
  //           z-10 flex items-center justify-center'>
  //             <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
  //               <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
  //               <input  onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter Resume Title' className="w-full px-4 py-2 mb-4 focus:border-amber-600 ring-amber-600" required/>
  //               <button className='w-full py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors'>Create Resume</button>
  //               <XIcon className='absolute top-4 right-4 text-clate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{setShowCreateResume(false); setTitle('')}}/>
  //             </div>
  //           </form>
  //         )
  //       }

  //       {
  //         showUploadResume && (
  //            <form onSubmit={uploadResume}  onClick={()=> setShowUploadResume(false)}className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50
  //           z-10 flex items-center justify-center'>
  //             <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
  //               <h2 className='text-xl font-bold mb-4'>Upload a Resume</h2>
  //               <input onChange={(e)=>setTitle(e.target.value)} type="text" value={title} placeholder='Enter Resume Title' className="w-full px-4 py-2 mb-4 focus:border-amber-600 ring-amber-600" required/>
  //               <div>
  //                 <label htmlFor='resume-input' className='block text-sm text-slate-700'>
  //                   Select Resume File
  //                   <div className='flex flex-col items-center justify-center gap-2
  //                   border group text-slate-400 border-slate-400 border-dashed rounded-md
  //                   p-4 py-10 my-4 hover:border-amber-400 hover:text-amber-700 cursor-pointer transition-colors'>
  //                     {resume ? (
  //                       <p className='text-amber-700'>{resume?.name}</p>
  //                     ):(
  //                       <>
  //                       <UploadCloudIcon className='size-14 stroke-1'/>
  //                       <p>Upload Resume</p>
  //                       </>
  //                     )}
  //                   </div>
  //                 </label>
  //               <input id="resume-input" type="file" accept=".pdf" hidden
  //               onChange={(e)=>setResume(e.target.files[0])}/>

  //               </div>
  //               <button disabled={isLoading} className='w-full py-2 bg-amber-600 text-white rounded
  //                hover:bg-amber-700 transition-colors flex items-center justify-center gap-2'>
  //                 {
  //                   isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>
  //                 }
  //                 {
  //                   isLoading ? "Uploading...":"Upload Resume"
  //                 }
  //                 </button>
  //               <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{setShowUploadResume(false); setTitle('')}}/>
  //             </div>
  //           </form>
  //         )
  //       }

  //       {
  //         editResumeId && (
  //           <form onSubmit={editTitle}  onClick={()=> setEditResumeId(false)}className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50
  //           z-10 flex items-center justify-center'>
  //             <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
  //               <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
  //               <input  onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter Resume Title' className="w-full px-4 py-2 mb-4 focus:border-amber-600 ring-amber-600" required/>
  //               <button className='w-full py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors'>Update</button>
  //               <XIcon className='absolute top-4 right-4 text-clate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{setEditResumeId(false); setTitle('')}}/>
  //             </div>
  //           </form>
  //         )
  //       }
  //     </div>
  //   </div>
  // );

 return (
    <div className="min-h-screen">
      {/* small inline styles for animation & global transition — move to global if you prefer */}
      <style>{`
        * { transition: all 220ms ease; }
        @keyframes scaleIn {
          from { transform: scale(0.98); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn { animation: scaleIn .22s ease-out; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header card */}
        <div className="mb-8 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-700">
              Welcome back, <span className="text-amber-600">{user?.name}</span>
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your resumes — create new ones, upload PDFs or edit existing resumes.
            </p>
          </div>
        </div>

        {/* Primary actions - responsive */}
        <div className="flex gap-4 mb-6">
          <div
            onClick={() => setShowCreateResume(true)}
            className="w-full sm:max-w-48 h-52 bg-white shadow-md hover:shadow-xl rounded-2xl border border-amber-200 hover:border-amber-500 flex flex-col items-center justify-center gap-3 group hover:-translate-y-1 cursor-pointer"
          >
            <div className="p-3 bg-amber-500 text-white rounded-full shadow group-hover:scale-105">
              <PlusIcon className="w-6 h-6" />
            </div>
            <p className="text-slate-600 text-sm group-hover:text-amber-600">Create Resume</p>
          </div>

          <div
            onClick={() => setShowUploadResume(true)}
            className="w-full sm:max-w-48 h-52 bg-white shadow-md hover:shadow-xl rounded-2xl border border-amber-200 hover:border-amber-500 flex flex-col items-center justify-center gap-3 group hover:-translate-y-1 cursor-pointer"
          >
            <div className="p-3 bg-amber-500 text-white rounded-full shadow group-hover:scale-105">
              <UploadCloudIcon className="w-6 h-6" />
            </div>
            <p className="text-slate-600 text-sm group-hover:text-amber-600">Upload Resume</p>
          </div>
        </div>

        <hr className="border-slate-300 my-6" />

        {/* Resumes grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {allResumes.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 py-8">
              No resumes yet — create or upload one to get started.
            </div>
          ) : (
            allResumes.map((r, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <button
                  key={r._id}
                  onClick={() => navigate(`/app/builder/${r._id}`)}
                  className="relative w-full h-48 bg-white shadow-md hover:shadow-xl rounded-xl border group hover:-translate-y-1 text-left p-4 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}20)`,
                    borderColor: baseColor + "40",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-3 rounded-md"
                      style={{ background: "rgba(255,255,255,0.6)" }}
                    >
                      <FilePenLineIcon className="w-6 h-6" style={{ color: baseColor }} />
                    </div>

                    <div className="flex-1">
                      <p
                        className="font-medium text-slate-700 truncate"
                        style={{ color: baseColor }}
                      >
                        {r?.title || "Untitled Resume"}
                      </p>
                      <p className="text-[12px] text-slate-500 mt-2">
                        {r?.description ? r.description.slice(0, 80) + "..." : "Resume created"}
                      </p>
                    </div>
                  </div>

                  <p
                    className="absolute bottom-3 left-4 text-[11px] text-slate-500"
                    style={{ color: baseColor + "90" }}
                  >
                    Updated on {new Date(r?.updatedAt).toLocaleDateString()}
                  </p>

                  {/* edit/delete (appear on hover) */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditResumeId(r._id);
                        setTitle(r.title);
                      }}
                      className="p-1 rounded bg-white/80 hover:bg-amber-100"
                    >
                      <PenBoxIcon className="w-5 h-5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteResume(r._id);
                      }}
                      className="p-1 rounded bg-white/80 hover:bg-red-100"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Create Resume Modal */}
        {showCreateResume && (
          <div
            onClick={() => {
              setShowCreateResume(false);
              setTitle("");
            }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white shadow-xl border rounded-xl p-6 w-full max-w-sm animate-scaleIn"
            >
              <h2 className="text-xl font-bold mb-3">Create a Resume</h2>
              <form onSubmit={createResume} className="flex flex-col gap-3">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Enter Resume Title"
                  className="w-full px-4 py-2 border rounded focus:ring-amber-400"
                  required
                />
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-amber-600 text-white rounded">Create Resume</button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateResume(false);
                      setTitle("");
                    }}
                    className="py-2 px-3 bg-slate-100 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <button
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <div
            onClick={() => {
              setShowUploadResume(false);
              setTitle("");
              setResume(null);
            }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white shadow-xl border rounded-xl p-6 w-full max-w-sm animate-scaleIn"
            >
              <h2 className="text-xl font-bold mb-3">Upload a Resume</h2>

              <form onSubmit={uploadResume} className="flex flex-col gap-3">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Enter Resume Title"
                  className="w-full px-4 py-2 border rounded focus:ring-amber-400"
                  required
                />

                <label htmlFor="resume-input" className="block">
                  <div className="flex flex-col items-center justify-center gap-2 border border-slate-200 border-dashed rounded-md p-4 py-8 my-2 hover:border-amber-400 hover:text-amber-700 cursor-pointer">
                    {resume ? (
                      <p className="text-amber-700 truncate">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloudIcon className="w-10 h-10" />
                        <p className="text-sm text-slate-500">Select PDF file to upload</p>
                      </>
                    )}
                  </div>
                </label>

                <input
                  id="resume-input"
                  type="file"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />

                <div className="flex gap-2">
                  <button
                    disabled={isLoading}
                    className="flex-1 py-2 bg-amber-600 text-white rounded flex items-center justify-center gap-2"
                  >
                    {isLoading && <LoaderCircleIcon className="w-4 h-4 animate-spin" />}
                    {isLoading ? "Uploading..." : "Upload Resume"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadResume(false);
                      setTitle("");
                      setResume(null);
                    }}
                    className="py-2 px-3 bg-slate-100 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <button
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResume(null);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Edit Title Modal */}
        {editResumeId && (
          <div
            onClick={() => {
              setEditResumeId("");
              setTitle("");
            }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white shadow-xl border rounded-xl p-6 w-full max-w-sm animate-scaleIn"
            >
              <h2 className="text-xl font-bold mb-3">Edit Resume Title</h2>

              <form onSubmit={editTitle} className="flex flex-col gap-3">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Enter Resume Title"
                  className="w-full px-4 py-2 border rounded focus:ring-amber-400"
                  required
                />

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-amber-600 text-white rounded">Update</button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditResumeId("");
                      setTitle("");
                    }}
                    className="py-2 px-3 bg-slate-100 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <button
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default Dashboard;
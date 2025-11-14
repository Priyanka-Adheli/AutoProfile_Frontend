import React from "react"
import { Link } from "react-router-dom"
const Banner = () =>{
    return(
        <div>
        <div className="flex flex-wrap items-center justify-between w-full px-4 md:px-14 py-2 font-medium text-sm text-white text-center bg-gradient-to-r from-amber-500 to-amber-100">
            <p>Build Faster and ATS Friendly Resume with AI Resume Builder</p>
             <Link to="/app?state=register" className="flex items-center gap-1 px-3 py-1 rounded-lg text-amber-600 bg-amber-50 hover:bg-slate-100 transition active:scale-95 ml-3">
                            Explore now
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
        </div>
        </div>
    )
}

export default Banner
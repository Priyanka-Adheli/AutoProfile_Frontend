import React from "react";
import { Link } from "react-router-dom";
const CallToAction = () =>{

    return (
         <div id='cta' className='w-full max-w-5xl mx-auto px-10 sm:px-16 mt-18'>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 py-16 sm:py-20 -mt-10 -mb-10 w-full">
                <p className="text-xl font-medium max-w-md text-slate-800">Build an professional resume that helps you to stand Out!</p>
               <Link to="/app?state=register" className="bg-amber-500 hover:bg-amber-600 text-white px-9 h-12 m-1 ring-offset-2 ring-1 ring-amber-400 flex items-center transition-colors">
                            Get started
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
            </div>
        </div>
    )
}

export default CallToAction;
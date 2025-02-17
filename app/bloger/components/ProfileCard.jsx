import React from 'react'

import { TbWritingSign } from "react-icons/tb"; //write icon
import { FaRegComment } from "react-icons/fa"; //comments icon

const ProfileCard = () => {

    return (

        <section className='w-full md:w-[32%] flex flex-col gap-4 h-fit'>

            {/* section 1 - skills card */}
            <div className='w-full h-fit flex gap-2 flex-col p-4 md:rounded bg-white shadow-sm'>
                {/* heading */}
                <h2 className='text-lg font-semibold text-zinc-900 capitalize'>Skills</h2>

                {/* line break */}
                <div className='w-full h-[0.6px] bg-zinc-100'></div>

                <p className='text-zinc-700'>I specialize in:
                    Languages: Python, Java, Go, JavaScript
                    Cloud: AWS, GCP, Azure, OCI
                    DevOps: Docker, Kubernetes, Terraform, Jenkins, Git, CI/CD pipelines
                    AI/ML: Generative AI, LLMs</p>
            </div>

            {/* section 1 - published post,  comments writeen followed tags */}
            <div className='w-full h-fit flex gap-2 flex-col p-4 md:rounded bg-white shadow-sm'>

                <p className='text-zinc-600 flex gap-2 items-center'>
                    <TbWritingSign className='text-xl font-semibold'/>
                    7 Post Published
                </p>

                <p className='text-zinc-600 flex gap-2 items-center'>
                    <FaRegComment className='text-lg font-semibold'/>
                    9 comments wriiten
                </p>

                <p className='text-zinc-600 flex gap-3 items-center'>
                    <span className='text-xl font-semibold'>#</span>
                    9 tags followed
                </p>

            </div>

        </section>
    )
}

export default ProfileCard
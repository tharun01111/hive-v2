
const ProjectList = () => {

  return (
    <div className="ml-10 mt-1 space-y-1">
      <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-white">

        <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />

        Frontend

      </button>

      <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-white">

        <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />

        Backend

      </button>


      <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-white">

        <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />

        Mobile

      </button>

    </div>
  )
}

export default ProjectList
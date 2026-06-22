
const DashboardHero = ({name}: {name: string}) => {
  return (
    <div className='flex items-center justify-between rounded-2xl border p-6'>
      <div>
      <h3 className='text-3xl font-bold'>Good Evening, {name}</h3>
      <p className='text-gray-500 mt-2'>Let's Build something today.</p>
    </div>
    <div >
      <button className='px-4 py-2 rounded-lg border hover:bg-neutral-100 transition'>New Workspace</button>
      <button className='px-4 py-2 rounded-lg border hover:bg-neutral-100 transition'>New Project</button>
    </div>
  </div>
  )
}

export default DashboardHero
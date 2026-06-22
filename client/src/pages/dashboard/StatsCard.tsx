
type StatCardProps = {
  title: string;
  value: number;
  description: string;
};

const StatsCard = ({ title, value, description }: StatCardProps) => {
  return (
    <div className='rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:shadow-md hover:-translate-y-1'
    >
      <h3 className='text-sm font-medium text-neutral'>{title}</h3>
      <p className='mt-4 text-5xl font-bold tracking-tight'>{value}</p>
      <p className='mt-2 text-sm text-neutral-400'>{description}</p>
    </div>
  )
}

export default StatsCard
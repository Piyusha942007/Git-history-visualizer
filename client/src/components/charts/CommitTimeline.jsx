export default function CommitTimeline({ data }) {
  if (!data) return <div className="h-48 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-lg border-2 border-dashed">Waiting for repository data to generate timeline...</div>;
  
  return (
    <div className="h-64">
      {/* Your friend will use 'data' here to map a Recharts or Chart.js line graph */}
    </div>
  );
}
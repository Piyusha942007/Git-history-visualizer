export default function TopContributors({ data }) {
  if (!data) return <div className="h-48 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-lg border-2 border-dashed">Waiting for contributor data...</div>;

  return (
    <div className="space-y-4">
      {data.map((user, i) => (
        <div key={i} className="flex items-center justify-between border-b pb-2">
          <span className="font-medium text-gray-700">{user.name}</span>
          <span className="text-indigo-600 font-bold">{user.commits} commits</span>
        </div>
      ))}
    </div>
  );
}
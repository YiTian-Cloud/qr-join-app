'use client'

export default function GroupClient({ groupId }: { groupId: string }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Group</h1>
      <div className="text-sm text-gray-600">ID: {groupId}</div>
    </div>
  )
}

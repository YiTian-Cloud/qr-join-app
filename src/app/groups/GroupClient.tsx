'use client'

export default function GroupClient({ groupId }: { groupId: string }) {
  // Start simple so you can confirm it renders.
  // You can wire Firestore here later.
  return (
    <div className="p-6 space-y-2">
      <h1 className="text-xl font-semibold">Group</h1>
      <div className="text-sm text-gray-600">ID: {groupId}</div>
      {/* TODO: fetch group + members */}
    </div>
  )
}

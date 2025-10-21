export const dynamic = 'force-dynamic'
export const revalidate = 0

import GroupClient from './GroupClient'

export default function GroupPage({ params }: { params: { groupId: string } }) {
  return <GroupClient groupId={params.groupId} />
}

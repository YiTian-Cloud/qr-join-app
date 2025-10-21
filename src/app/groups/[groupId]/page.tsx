// Do NOT import or use `PageProps` here.
export const dynamic = 'force-dynamic'
export const revalidate = 0

import GroupClient from './GroupClient'

type Props = { params: { groupId: string } }

export default function GroupPage({ params }: Props) {
  return <GroupClient groupId={params.groupId} />
}

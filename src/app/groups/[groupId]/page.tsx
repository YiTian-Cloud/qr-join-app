export const dynamic = 'force-dynamic'
export const revalidate = 0

import GroupClient from './GroupClient'

// keep it simple to unblock the build; we can refine types later
export default function GroupPage({ params }: any) {
  return <GroupClient groupId={String(params?.groupId ?? '')} />
}

'use client';
export const dynamic = 'force-dynamic'
export const revalidate = 0

import GroupClient from './GroupClient'

export default async function GroupPage({
  params,
}: {
  params: Promise<{ groupId: string }>
}) {
  const { groupId } = await params
  return <GroupClient groupId={groupId} />
}

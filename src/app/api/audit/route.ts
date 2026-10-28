import { createAuditHandler } from '@/features/audit/server/handle-audit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  return createAuditHandler()(request);
}

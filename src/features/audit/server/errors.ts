export class AuditError extends Error {
  constructor(public readonly code: string, message: string, public readonly status = 422) {
    super(message);
    this.name = 'AuditError';
  }
}

export function abortError(signal: AbortSignal): AuditError {
  return signal.reason instanceof AuditError ? signal.reason : new AuditError('CANCELLED', 'The audit was cancelled.', 408);
}

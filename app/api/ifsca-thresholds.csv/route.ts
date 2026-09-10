import { ROWS, toCsv, VERSION } from '@/lib/content/ifscaThresholds'

/** CSV export for the IFSCA threshold table (Appendix A, Task A.5). */
export function GET() {
  return new Response(toCsv(ROWS), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="ifsca-thresholds-${VERSION}.csv"`,
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

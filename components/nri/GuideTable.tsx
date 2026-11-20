'use client'

import type { CorridorTable } from '@/lib/content/types'
import { renderInline } from '@/lib/utils/renderInline'
import { TapTable } from '@/components/shared/TapTable'

/** A country-guide table. See TapTable for the phone behaviour. */
export function GuideTable({ table, openFirst = false }: { table: CorridorTable; openFirst?: boolean }) {
  return (
    <TapTable
      head={table.head}
      rows={table.rows.map((row) => ({ key: row[0], cells: row.map((cell) => renderInline(cell)) }))}
      openFirst={openFirst}
    />
  )
}

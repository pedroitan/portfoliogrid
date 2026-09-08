import { NextResponse } from 'next/server';
import { getCoursePriceCentavos } from '@/lib/course';

export async function GET() {
  const centavos = await getCoursePriceCentavos();
  return NextResponse.json({ price_centavos: centavos });
}

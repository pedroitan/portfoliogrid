import { supabase } from './supabase';

const PRICE_KEY = 'course_price_centavos';
const FALLBACK_CENTAVOS = 1000; // R$ 10,00

export async function getCoursePriceCentavos() {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', PRICE_KEY)
    .maybeSingle();

  if (error) {
    console.error('[Settings read error]', error);
    return FALLBACK_CENTAVOS;
  }

  const value = Number(data?.value);
  return Number.isFinite(value) && value > 0 ? Math.round(value) : FALLBACK_CENTAVOS;
}

export async function setCoursePriceCentavos(centavos: number) {
  const { error } = await supabase
    .from('settings')
    .upsert({ key: PRICE_KEY, value: String(Math.round(centavos)) });
  if (error) {
    console.error('[Settings write error]', error);
    return false;
  }
  return true;
}

/**
 * Supabase Client — AF-PHONE
 * ─────────────────────────
 * Prérequis : créez un projet sur https://supabase.com
 * puis renseignez vos clés dans un fichier .env.local :
 *
 *   VITE_SUPABASE_URL=https://xxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY=your-anon-key
 *
 * Tables suggérées (SQL à exécuter dans l'éditeur Supabase) :
 *
 * -- Rendez-vous clients
 * create table appointments (
 *   id          uuid primary key default gen_random_uuid(),
 *   name        text not null,
 *   phone       text not null,
 *   device      text not null,
 *   issue       text,
 *   slot        timestamptz not null,
 *   status      text default 'pending',
 *   created_at  timestamptz default now()
 * );
 *
 * -- Stock téléphones
 * create table phones_stock (
 *   id          uuid primary key default gen_random_uuid(),
 *   brand       text not null,
 *   model       text not null,
 *   condition   text not null,   -- 'new' | 'refurbished'
 *   price       numeric(10,2),
 *   stock_qty   int default 0,
 *   created_at  timestamptz default now()
 * );
 *
 * -- Row Level Security (basique)
 * alter table appointments enable row level security;
 * create policy "Public insert" on appointments for insert with check (true);
 * alter table phones_stock enable row level security;
 * create policy "Public read" on phones_stock for select using (true);
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseKey) {
  console.warn('[AF-PHONE] Supabase env vars manquantes — fonctionnalités désactivées.')
}

export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')

/* ── Types ── */
export interface Appointment {
  id?:         string
  name:        string
  phone:       string
  device:      string
  issue?:      string
  slot:        string
  status?:     'pending' | 'confirmed' | 'done'
  created_at?: string
}

export interface PhoneStock {
  id?:        string
  brand:      string
  model:      string
  condition:  'new' | 'refurbished'
  price?:     number
  stock_qty:  number
}

/* ── Helpers ── */

/** Créer un rendez-vous */
export async function createAppointment(data: Omit<Appointment, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('appointments')
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return result as Appointment
}

/** Lire le stock disponible */
export async function getPhoneStock(): Promise<PhoneStock[]> {
  const { data, error } = await supabase
    .from('phones_stock')
    .select('*')
    .gt('stock_qty', 0)
    .order('brand')
  if (error) throw error
  return (data ?? []) as PhoneStock[]
}

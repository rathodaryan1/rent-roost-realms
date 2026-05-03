import { supabase } from "./src/lib/supabase";

async function checkTables() {
  const tables = ['profiles', 'properties', 'rooms', 'tenants', 'bookings', 'payments', 'expenses', 'issues'];
  for (const table of tables) {
    const { error } = await supabase.from(table).select('id').limit(1);
    if (error) {
      console.log(`❌ Table ${table}: ${error.message}`);
    } else {
      console.log(`✅ Table ${table}: Exists`);
    }
  }
}

checkTables();


import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://nocepoujsyazueensodb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vY2Vwb3Vqc3lhenVlZW5zb2RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzEyNjYsImV4cCI6MjA2MjkwNzI2Nn0.y_HoN586wphQdKDwLhIE7OQw-6jztl3cTQK7nVtDjZs'

export const supabase = createClient(supabaseUrl, supabaseKey);


        
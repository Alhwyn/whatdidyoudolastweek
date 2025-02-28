import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lnmqapufadpjlhsvoqnu.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxubXFhcHVmYWRwamxoc3ZvcW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTM1NTAsImV4cCI6MjA1NjI4OTU1MH0.b5rlnDJ2zEyOI5q_14zVCMIRHXLF-STEsKe89x8g4EU"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase
-- This snippet enables RLS for the specified tables and creates policies for public read access.

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to states" ON public.states;
DROP POLICY IF EXISTS "Allow public read access to cities" ON public.cities;

-- Allow public read access to published events
CREATE POLICY "Allow public read access to published events" ON public.events
    FOR SELECT
    USING (status = 'published'::event_status);

-- Allow public read access to organizers
CREATE POLICY "Allow public read access to organizers" ON public.organizers
    FOR SELECT
    TO public
    USING (true);

-- Allow public read access to states
CREATE POLICY "Allow public read access to states" ON public.states
    FOR SELECT
    TO public
    USING (true);

-- Allow public read access to cities
CREATE POLICY "Allow public read access to cities" ON public.cities
    FOR SELECT
    TO public
    USING (true);


GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
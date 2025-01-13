-- Insert Bahia state if not exists
INSERT INTO public.states (name, uf)
VALUES ('Bahia', 'BA')
ON CONFLICT (uf) DO NOTHING;

-- Insert cities
INSERT INTO public.cities (name, state_id)
VALUES 
    ('Mata de São João', (SELECT id FROM public.states WHERE uf = 'BA')),
    ('Salvador', (SELECT id FROM public.states WHERE uf = 'BA')),
    ('Feira de Santana', (SELECT id FROM public.states WHERE uf = 'BA'))
ON CONFLICT DO NOTHING;

-- Insert organizer
INSERT INTO public.organizers (name, email, phone, whatsapp)
VALUES (
    'Decide Digital Eventos',
    'eventos@decidedigital.com.br',
    '+55 71 99999-9999',
    '+55 71 99999-9999'
);

-- Insert events
-- This snippet inserts events into the public.events table, ensuring that date and end_date are cast to timestamp with time zone.

INSERT INTO public.events (
    name,
    description,
    location,
    state_id,
    city_id,
    date,
    end_date,
    thumbnail_url,
    banner_url,
    is_featured,
    organizer_id,
    status
)
SELECT
    event_data.name,
    event_data.description,
    event_data.location,
    (SELECT id FROM public.states WHERE uf = 'BA'),
    (SELECT id FROM public.cities WHERE name = event_data.city),
    event_data.date::timestamp with time zone,  -- Cast to timestamp with time zone
    event_data.end_date::timestamp with time zone,  -- Cast to timestamp with time zone
    'https://images.pexels.com/photos/2240772/pexels-photo-2240772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    event_data.is_featured,
    (SELECT id FROM public.organizers WHERE email = 'eventos@decidedigital.com.br'),
    'published'
FROM (
    VALUES
        (
            'Festival de Verão 2025',
            'O maior festival de música do verão baiano está de volta! Com mais de 20 atrações distribuídas em 2 palcos, o Festival de Verão 2025 promete ser inesquecível.',
            'Praia do Forte',
            'Mata de São João',
            '2025-02-15 20:00:00+00',
            '2025-02-16 04:00:00+00',
            true
        ),
        (
            'Show de MPB na Praia',
            'Uma noite especial com os maiores clássicos da MPB à beira-mar. Uma experiência única com artistas locais e convidados especiais.',
            'Praia do Forte',
            'Mata de São João',
            '2025-02-20 19:00:00+00',
            '2025-02-20 23:00:00+00',
            false
        ),
        (
            'Festival de Jazz 2025',
            'O tradicional festival de jazz retorna com artistas nacionais e internacionais. Três dias de música de qualidade e workshops.',
            'Teatro L''Occitane',
            'Mata de São João',
            '2025-02-25 16:00:00+00',
            '2025-02-27 23:00:00+00',
            true
        ),
        (
            'Noite de Samba',
            'Uma noite dedicada ao samba com as melhores rodas de samba da região e convidados especiais.',
            'Vila da Praia do Forte',
            'Mata de São João',
            '2025-03-01 20:00:00+00',
            '2025-03-02 02:00:00+00',
            false
        ),
        (
            'Festa Junina Antecipada',
            'Antecipando os festejos juninos, uma grande festa com quadrilha, comidas típicas e muito forró.',
            'Praça Central',
            'Mata de São João',
            '2025-03-15 18:00:00+00',
            '2025-03-16 02:00:00+00',
            true
        ),
        (
            'Festival Gastronômico',
            'Um evento dedicado à gastronomia local, com os melhores restaurantes e chefs da região.',
            'Orla da Praia do Forte',
            'Mata de São João',
            '2025-03-22 12:00:00+00',
            '2025-03-24 22:00:00+00',
            false
        ),
        (
            'Sunset Eletrônico',
            'Uma tarde de música eletrônica com DJs nacionais e internacionais, com vista para o pôr do sol mais bonito da região.',
            'Praia do Forte',
            'Mata de São João',
            '2025-04-05 16:00:00+00',
            '2025-04-06 00:00:00+00',
            true
        ),
        (
            'Festival de Teatro',
            'Uma semana dedicada às artes cênicas, com apresentações de grupos de teatro de todo o Brasil.',
            'Teatro L''Occitane',
            'Mata de São João',
            '2025-04-15 14:00:00+00',
            '2025-04-21 22:00:00+00',
            false
        ),
        (
            'Feira de Artesanato',
            'Exposição e venda de artesanato local, com workshops e apresentações culturais.',
            'Vila da Praia do Forte',
            'Mata de São João',
            '2025-05-01 10:00:00+00',
            '2025-05-03 20:00:00+00',
            false
        ),
        (
            'Luau Musical',
            'Uma noite especial de música acústica à luz da lua, com artistas locais e convidados.',
            'Praia do Forte',
            'Mata de São João',
            '2025-05-15 19:00:00+00',
            '2025-05-15 23:00:00+00',
            true
        )
    ) AS event_data(name, description, location, city, date, end_date, is_featured);

-- Insert ticket types for each event
INSERT INTO public.ticket_types (
    event_id,
    name,
    description,
    price,
    quantity,
    remaining,
    type
)
SELECT 
    events.id,
    'Ingresso Inteira',
    'Ingresso valor integral',
    250.00,
    1000,
    1000,
    'full'
FROM public.events
UNION ALL
SELECT 
    events.id,
    'Ingresso Meia',
    'Meia entrada mediante comprovação',
    125.00,
    500,
    500,
    'half'
FROM public.events
UNION ALL
SELECT 
    events.id,
    'Ingresso Infantil',
    'Crianças até 12 anos',
    0.00,
    200,
    200,
    'child'
FROM public.events;




-- Insert Statements for Tickets table
INSERT INTO tickets (user_id, event_id, ticket_type_id, qr_code, status, created_at, updated_at)
VALUES
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', 'ef2c2e85-d50d-49d6-8cac-7c8e05a056d5', '26968dae-9415-4c7f-8afd-d3ef9c415af6', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', 'eb1bf69b-1a59-4057-8c7a-d324957b6c12', 'd408ee97-3787-4ad7-8b63-b003866f0fd9', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '7c271adc-f089-4995-b908-7b22f2a2796a', '7bf3a1e4-4c45-4c62-b1d5-e2327b5e3127', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '3409064f-1873-4cff-9e74-9e67a0ae46bb', '9a43d391-0d70-497c-b133-f4160993134e', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '5e0eeaa7-b930-4873-b00c-aa74bc18991b', 'ba537e3b-b977-4127-b029-f03398c6d402', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '075b95d1-ee49-4d23-9fe8-50f4574faec1', '7b068603-1ff7-42f5-a95f-5777b0bfe77f', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '12c473c3-0548-49d9-b56e-98ff32149bec', '6ba4ab47-44d5-4515-9125-5f4abce62e8b', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', 'c512c320-0604-4786-8bd2-f807b7384ebf', '974d7dec-4498-4518-8f1f-15e92f37396e', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '26dc1613-b7e3-4321-9cd0-ee08601c1d71', '04e8872c-1479-4bd7-b33f-12e43ec8dd14', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '24e41005-05cf-41a5-a4fd-83fcb4cbb99d', '76239ab9-8d98-4b90-8d0a-42512335a406', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', 'ef2c2e85-d50d-49d6-8cac-7c8e05a056d5', '0f851af9-fa51-46ad-8c8f-92880bff1e2d', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', 'eb1bf69b-1a59-4057-8c7a-d324957b6c12', 'b98042fa-f03d-4397-8b16-55feefa29781', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '7c271adc-f089-4995-b908-7b22f2a2796a', '4f64e134-bce2-4c1a-bcc1-bbee6f66478c', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '3409064f-1873-4cff-9e74-9e67a0ae46bb', 'f1432512-307d-477f-ac3f-d3e0b702bcd9', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '5e0eeaa7-b930-4873-b00c-aa74bc18991b', '4805c785-3652-4fbe-8622-1ec02d9c6ad0', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '075b95d1-ee49-4d23-9fe8-50f4574faec1', '0cb9d8c4-d8e4-4086-ac62-3fe8a5213354', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '12c473c3-0548-49d9-b56e-98ff32149bec', '8c2a2a29-ad05-40f5-a253-35c3fae1ac7e', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', 'c512c320-0604-4786-8bd2-f807b7384ebf', 'df012283-64c5-4289-8b5c-f96f9d98eb75', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '26dc1613-b7e3-4321-9cd0-ee08601c1d71', '83a0b5ed-2f0f-41f6-bcfc-e9774fc7f197', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '24e41005-05cf-41a5-a4fd-83fcb4cbb99d', '7a51486e-c2fc-44c2-8f14-213abcbf8d37', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', 'ef2c2e85-d50d-49d6-8cac-7c8e05a056d5', '602f3334-816a-4a72-924a-6b37485e3fd7', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', 'eb1bf69b-1a59-4057-8c7a-d324957b6c12', '58e19b4c-8add-4d32-a0f0-8d02bdc3f8af', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '7c271adc-f089-4995-b908-7b22f2a2796a', '7a9a623e-f1e4-4258-b9e4-2f4975d9b39f', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '3409064f-1873-4cff-9e74-9e67a0ae46bb', 'e01714f0-e148-480d-bb9c-e54f9c12233e', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '5e0eeaa7-b930-4873-b00c-aa74bc18991b', 'e994c19c-bd85-412f-b40f-01f41a31fb4a', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '075b95d1-ee49-4d23-9fe8-50f4574faec1', '0a4a0bce-019c-4d89-b3f9-47535b75e8bd', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '12c473c3-0548-49d9-b56e-98ff32149bec', 'e07edfff-f516-4558-b36d-f1623736c316', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', 'c512c320-0604-4786-8bd2-f807b7384ebf', '00a7c068-6d5e-4448-b671-a67be89d0816', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '26dc1613-b7e3-4321-9cd0-ee08601c1d71', 'c37d900a-26b9-4066-adf2-b2ea8e923f2d', uuid_generate_v4(), 'active', NOW(), NOW()),
('c729c8c3-cdef-4d52-8dbe-b9be2b8da513', '24e41005-05cf-41a5-a4fd-83fcb4cbb99d', '2a4a29f4-1df2-43f0-8421-aef17273c657', uuid_generate_v4(), 'active', NOW(), NOW());
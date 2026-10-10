
create table if not exists loans (
  id bigint generated always as identity primary key,
  member_name text not null,
  book_title text not null,
  loan_date date not null,
  due_date date not null,
  return_date date,
  status text not null default 'Dipinjam' check (status in ('Dipinjam', 'Dikembalikan', 'Terlambat')),
  created_at timestamp with time zone default now()
);

insert into loans (member_name, book_title, loan_date, due_date, status)
values
  ('Rakha Aljiva ', 'Laskar Pelangi', '2026-09-01', '2026-09-15', 'Dikembalikan'),
  ('Gibran Pinto', 'Bumi Manusia', '2026-09-20', '2026-10-04', 'Terlambat'),
  ('Prabowo Widodo', 'Negeri 5 Menara', '2026-10-05', '2026-10-19', 'Dipinjam');

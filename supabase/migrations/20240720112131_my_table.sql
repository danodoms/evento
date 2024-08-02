alter table "public"."users" add column "role" smallint not null;

alter table "public"."users" alter column "email" set data type text using "email"::text;

alter table "public"."users" disable row level security;

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

create policy "Enable read access for all users"
on "public"."events"
as permissive
for select
to public
using (true);




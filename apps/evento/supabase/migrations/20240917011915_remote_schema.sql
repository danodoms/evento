alter table "public"."students" drop column "name";

alter table "public"."students" add column "first_name" text not null;

alter table "public"."students" add column "last_name" text not null;

alter table "public"."users" add column "name" text not null;

set check_function_bodies = off;

create or replace view "public"."attendance_recent" as  SELECT attendance.id,
    attendance."time",
    attendance.date,
    attendance.school_id,
    attendance.is_active,
    attendance.is_time_in,
    attendance.scanned_by_email,
    students.first_name,
    students.last_name,
    students.dept_id,
    departments.short_name AS dept_short_name,
    departments.name AS dept_name
   FROM ((attendance
     JOIN students ON ((attendance.school_id = students.school_id)))
     JOIN departments ON ((students.dept_id = departments.id)))
  ORDER BY attendance.date DESC, attendance."time" DESC;


CREATE OR REPLACE FUNCTION public.get_filtered_paginated_school_ids(current_page integer, search_query text, limit_count integer)
 RETURNS TABLE(school_id text, total_count integer)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT DISTINCT ON (a.school_id) 
         a.school_id, 
         COUNT(*) OVER()::INTEGER AS total_count
  FROM attendance a
  WHERE a.school_id ILIKE '%' || search_query || '%'
  ORDER BY a.school_id
  LIMIT limit_count
  OFFSET (current_page - 1) * limit_count;
END;
$function$
;



create extension if not exists pgcrypto;

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  primary_email text,
  display_name text,
  first_name text,
  last_name text,
  fan_tier text default 'bronze' not null,
  email_verified boolean default false not null,
  confirmed_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create unique index if not exists app_users_primary_email_unique
  on app_users (lower(primary_email))
  where primary_email is not null;

create table if not exists auth_identities (
  id uuid primary key default gen_random_uuid(),
  app_user_id uuid not null references app_users(id) on delete cascade,
  provider text not null,
  provider_subject text not null,
  provider_email text,
  email_verified boolean default false not null,
  raw_claims jsonb default '{}'::jsonb not null,
  last_login_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  constraint auth_identities_provider_subject_unique unique (provider, provider_subject)
);

create index if not exists auth_identities_app_user_id_idx
  on auth_identities (app_user_id);

create index if not exists auth_identities_provider_email_idx
  on auth_identities (lower(provider_email));

create table if not exists user_profiles (
  app_user_id uuid primary key references app_users(id) on delete cascade,
  favourite_club text default 'manchester-united' not null,
  avatar_url text,
  marketing_opt_in boolean default false not null,
  age_verified boolean default false not null,
  preferences jsonb default '{}'::jsonb not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table auth_identities is 'Maps external auth providers like ZITADEL to internal app user ids.';
comment on column auth_identities.provider_subject is 'Use ZITADEL sub claim as the immutable reconciliation key.';
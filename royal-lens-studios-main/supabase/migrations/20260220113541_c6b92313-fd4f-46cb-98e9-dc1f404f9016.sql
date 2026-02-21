
-- Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'staff');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Helper: check if user is admin or staff
CREATE OR REPLACE FUNCTION public.is_admin_or_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'staff')
  )
$$;

-- RLS for user_roles: only admins can manage roles
CREATE POLICY "Admins can view roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  source TEXT DEFAULT 'contact_form',
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  next_followup DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin/staff can view leads" ON public.leads FOR SELECT USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can insert leads" ON public.leads FOR INSERT WITH CHECK (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can update leads" ON public.leads FOR UPDATE USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can delete leads" ON public.leads FOR DELETE USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Clients table
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  total_bookings INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin/staff can manage clients" ON public.clients FOR ALL USING (public.is_admin_or_staff(auth.uid()));

-- Packages table
CREATE TABLE public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'silver',
  price NUMERIC NOT NULL DEFAULT 0,
  description TEXT,
  deliverables JSONB DEFAULT '[]',
  is_popular BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active packages" ON public.packages FOR SELECT USING (true);
CREATE POLICY "Admin can manage packages" ON public.packages FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can update packages" ON public.packages FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can delete packages" ON public.packages FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Add-ons table
CREATE TABLE public.add_ons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  description TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.add_ons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active addons" ON public.add_ons FOR SELECT USING (true);
CREATE POLICY "Admin can manage addons" ON public.add_ons FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Projects (portfolio)
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'wedding',
  description TEXT,
  story TEXT,
  location TEXT,
  shoot_date DATE,
  gear_used TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admin/staff can manage projects" ON public.projects FOR INSERT WITH CHECK (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can update projects" ON public.projects FOR UPDATE USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can delete projects" ON public.projects FOR DELETE USING (public.is_admin_or_staff(auth.uid()));

-- Project media
CREATE TABLE public.project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  media_type TEXT DEFAULT 'image',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view project media" ON public.project_media FOR SELECT USING (true);
CREATE POLICY "Admin/staff can manage media" ON public.project_media FOR ALL USING (public.is_admin_or_staff(auth.uid()));

-- Testimonials table (replace hardcoded)
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_role TEXT,
  review TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admin can manage testimonials" ON public.testimonials FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Follow-ups
CREATE TABLE public.followups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  next_date DATE,
  completed BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.followups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin/staff can manage followups" ON public.followups FOR ALL USING (public.is_admin_or_staff(auth.uid()));

-- Studio settings (single-row config)
CREATE TABLE public.studio_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_name TEXT DEFAULT 'Royal Lens Studio',
  whatsapp_number TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  address TEXT DEFAULT '',
  working_hours JSONB DEFAULT '{"mon":"9:00-18:00","tue":"9:00-18:00","wed":"9:00-18:00","thu":"9:00-18:00","fri":"9:00-18:00","sat":"10:00-16:00","sun":"closed"}',
  social_links JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.studio_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view settings" ON public.studio_settings FOR SELECT USING (true);
CREATE POLICY "Admin can update settings" ON public.studio_settings FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Insert default settings row
INSERT INTO public.studio_settings (studio_name, whatsapp_number, phone, email, address)
VALUES ('Royal Lens Studio', '+919876543210', '+44 20 7946 0958', 'hello@royallens.studio', '123 Royal Avenue, Mayfair, London W1K 6TH');

-- Updated_at triggers for new tables
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON public.packages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_studio_settings_updated_at BEFORE UPDATE ON public.studio_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

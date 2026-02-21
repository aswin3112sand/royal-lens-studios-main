INSERT INTO studio_settings (studio_name, whatsapp_number, phone, email, address)
VALUES ('Photographer', '919876543210', '+44 20 7946 0958', 'hello@photographer.studio', '123 Royal Avenue, Mayfair, London W1K 6TH');

INSERT INTO packages (name, tier, price, description, deliverables_json, is_popular, active, sort_order)
VALUES
  ('Silver Moments', 'silver', 4000, 'Essential session package for portraits and small shoots.', '["1 hour session","20 edited photos","Online gallery"]', 0, 1, 1),
  ('Golden Story', 'gold', 9500, 'Perfect for events and premium sessions.', '["3 hour session","60 edited photos","Priority delivery"]', 1, 1, 2),
  ('Platinum Signature', 'platinum', 18000, 'Complete premium photography experience.', '["Full day coverage","150 edited photos","Premium album"]', 0, 1, 3);

INSERT INTO testimonials (client_name, client_role, review, rating, published, featured)
VALUES
  ('Victoria Ashford', 'Bride', 'Royal Lens captured our wedding beautifully. Every frame felt magical.', 5, 1, 1),
  ('James Whitmore', 'CEO, Sterling Corp', 'Professional and elegant portraits that elevated our brand.', 5, 1, 1),
  ('Sophia Chen', 'Fashion Designer', 'Creative direction and execution were top class from start to finish.', 5, 1, 1);
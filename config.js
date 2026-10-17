// ============================================================
// Split or Stay — settings. This is the only file you need to edit.
// ============================================================
window.SOS_CONFIG = {
  // Supabase → Project Settings → API (or "Connect")
  supabaseUrl: "https://scfurssqeeaniwxhuycx.supabase.co",
  supabaseAnonKey: "sb_publishable_NgSinZ-LZKP3iOv78qAVsw_-8saNNmB",

  // Shown on the home page, Terms and Privacy pages. Use an address you check.
  contactEmail: "leslie71417@gmail.com",

  // Starting numbers for "people are waiting for your verdict", per region.
  // Real waiting questions are added on top. Set all to 0 to show real numbers only.
  coldStartBase: { jp: 976, us: 1147, global: 2649 },

  // Optional bot protection (Cloudflare Turnstile). Leave "" to turn off.
  // If you set it, also turn on CAPTCHA in Supabase → Authentication → Attack Protection.
  turnstileSiteKey: ""
};

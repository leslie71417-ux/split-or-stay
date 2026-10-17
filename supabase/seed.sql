-- Starter questions. Run once in the SQL Editor after schema.sql.
insert into public.posts (text, tags, len, lang, region, aud, author, created_at) values
 ('Together 2 years. He still hasn''t introduced me to his parents and changes the subject whenever I bring it up. Everything else is honestly great.',
  '{family}', 'c', 'en', 'us', 'us', null, now() - interval '3 days 4 hours'),
 ('We never fight, but we also never really talk anymore. It feels like living with a nice roommate.',
  '{spark}', 'd', 'en', 'us', 'us', null, now() - interval '2 days 7 hours'),
 ('She got into a grad program in London, I just started a job I love in Austin. We''d be long distance for 2 years with a 6-hour time difference.',
  '{ldr}', 'b', 'en', 'us', 'global', null, now() - interval '1 day 9 hours'),
 ('付き合って1年半。LINEの返信が毎回半日以上かかります。会うと優しいけど、私ばかり好きな気がしてしまう。',
  '{ghost}', 'c', 'ja', 'jp', 'jp', null, now() - interval '3 days 1 hour'),
 ('彼女が私のスマホを毎晩チェックします。浮気はしていないけど、正直しんどくなってきました。',
  '{jeal}', 'b', 'ja', 'jp', 'jp', null, now() - interval '1 day 15 hours'),
 ('彼は30歳で「まだ結婚は考えられない」と言います。私は32歳で子どもがほしい。待つべき？',
  '{marriage}', 'd', 'ja', 'jp', 'global', null, now() - interval '20 hours');

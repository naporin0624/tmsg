import express, { Request } from 'express';
import { configure } from '@tmsg/runtime';
import { pathToFileURL } from 'url';

const app = express();

const i18n = configure({
  locales: ['en', 'de'],
  rootURL: pathToFileURL(process.cwd() + '/dist/locales/'),
});

const getLang = (query: Request['query']): 'en' | 'de' => {
  if (!('lang' in query)) return 'en';

  return query['lang'] === 'de' ? 'de' : 'en';
};

app.get('/', async (req, res) => {
  const t = await i18n.buildT(getLang(req.query));
  res.send(
    t('Hello world {%url}!', {
      url: 'https://example.com',
    }),
  );
});

app.listen(8080, () => {
  console.log(`server started at http://localhost:8080`);
});

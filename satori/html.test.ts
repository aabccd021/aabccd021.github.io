import { a, body, h1, head, header, html, li, link, main, meta, nav, p, text, ul } from './html';

export const hlink = link({ href: '/favicon.ico', rel: 'icon' });

export const hlink2 = link({ href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' });

export const htmeta = meta({ charset: 'utf-8' });

// @ts-expect-error can't assign child to meta
export const htmeta2 = meta({ content: 'a' }, text('a'));

export const tagtest = html(
  { lang: 'en' },
  head({}),
  body(
    {},
    header(
      {},
      nav(
        {},
        a({ href: '/', class: 'nav-item' }, text('Home')),
        a({ href: '/', class: 'nav-item' }, text('Home'))
      )
    ),
    main(
      {},
      h1(
        { id: 'about-me' },
        text('About Me'),
        a({ href: '#about-me', class: 'header-anchor' }, text('#'))
      ),
      p({}, text('aab')),
      h1(
        { id: 'contacts' },
        text('Contacts'),
        a({ href: '#contacs', class: 'header-anchor' }, text('#'))
      ),
      ul(
        {},
        li({}, a({ href: 'aabccd021@gmail.com' }, text('Email'))),
        li({}, a({ href: 'https://github.com/aabccd021' }, text('GitHub')))
      )
    )
  )
);

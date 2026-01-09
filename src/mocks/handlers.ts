import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/hello', () =>
    HttpResponse.json({ code: 200, message: 'Hello, world!' }),
  ),
];

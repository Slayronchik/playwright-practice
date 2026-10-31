import { expect, test } from '@playwright/test';

interface ProductListResponse {
  data: unknown[];
}

function isProductListResponse(body: unknown): body is ProductListResponse {
  return typeof body === 'object' && body !== null && 'data' in body && Array.isArray(body.data);
}

test.describe('Products API', () => {
  test('returns a non-empty JSON product list', async ({ request }) => {
    const response = await request.get('https://api.practicesoftwaretesting.com/products');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body: unknown = await response.json();
    expect(isProductListResponse(body)).toBe(true);

    if (!isProductListResponse(body)) {
      throw new Error('The products API response does not contain a data array.');
    }

    expect(body.data.length).toBeGreaterThan(0);
  });

  test('returns no matches for a non-existent product search', async ({ request }) => {
    const response = await request.get(
      'https://api.practicesoftwaretesting.com/products/search',
      {
        params: { q: 'non-existent-product-987654321' },
      },
    );

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body: unknown = await response.json();
    expect(isProductListResponse(body)).toBe(true);

    if (!isProductListResponse(body)) {
      throw new Error('The product search response does not contain a data array.');
    }

    expect(body.data).toHaveLength(0);
  });
});

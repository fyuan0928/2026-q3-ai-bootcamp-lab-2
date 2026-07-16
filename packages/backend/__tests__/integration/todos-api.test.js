const request = require('supertest');
const { app, db } = require('../../src/app');

// Close the database connection after all tests
afterAll(() => {
  if (db) {
    db.close();
  }
});

describe('TODO API integration workflow', () => {
  it('supports the full create -> update -> delete lifecycle', async () => {
    // Create a new item
    const createResponse = await request(app)
      .post('/api/items')
      .send({ name: 'Integration Test Item' })
      .set('Accept', 'application/json');

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toMatchObject({
      name: 'Integration Test Item',
      completed: 0,
    });
    const { id } = createResponse.body;

    // Verify the item appears in the list
    const listResponse = await request(app).get('/api/items');
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.some((item) => item.id === id)).toBe(true);

    // Mark the item as completed
    const patchResponse = await request(app)
      .patch(`/api/items/${id}`)
      .send({ completed: true })
      .set('Accept', 'application/json');

    expect(patchResponse.status).toBe(200);
    expect(patchResponse.body.completed).toBe(1);

    // Delete the item
    const deleteResponse = await request(app).delete(`/api/items/${id}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toEqual({ message: 'Item deleted successfully', id });

    // Verify the item no longer appears in the list
    const finalListResponse = await request(app).get('/api/items');
    expect(finalListResponse.body.some((item) => item.id === id)).toBe(false);
  });
});

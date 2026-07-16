const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

const uniqueName = (label) => `${label} ${Date.now()}-${Math.floor(Math.random() * 10000)}`;

test.describe('TODO workflow', () => {
  test('allows a user to add a new item to the list', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const itemName = uniqueName('Buy groceries');

    await todoPage.goto();
    await todoPage.addItem(itemName);

    await expect(todoPage.getItem(itemName)).toBeVisible();
  });

  test('allows a user to mark an item as complete', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const itemName = uniqueName('Walk the dog');

    await todoPage.goto();
    await todoPage.addItem(itemName);
    await todoPage.toggleItemComplete(itemName);

    await expect(todoPage.getItem(itemName)).toHaveClass(/completed/);
  });

  test('filters items by completion status', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const activeItemName = uniqueName('Active task');
    const completedItemName = uniqueName('Completed task');

    await todoPage.goto();
    await todoPage.addItem(activeItemName);
    await todoPage.addItem(completedItemName);
    await todoPage.toggleItemComplete(completedItemName);

    await todoPage.filterBy('completed');
    await expect(todoPage.getItem(completedItemName)).toBeVisible();
    await expect(todoPage.getItem(activeItemName)).not.toBeVisible();

    await todoPage.filterBy('active');
    await expect(todoPage.getItem(activeItemName)).toBeVisible();
    await expect(todoPage.getItem(completedItemName)).not.toBeVisible();
  });

  test('allows a user to delete an item', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const itemName = uniqueName('Temporary item');

    await todoPage.goto();
    await todoPage.addItem(itemName);
    await expect(todoPage.getItem(itemName)).toBeVisible();

    await todoPage.deleteItem(itemName);
    await expect(todoPage.getItem(itemName)).not.toBeVisible();
  });
});

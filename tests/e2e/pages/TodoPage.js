class TodoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.newItemInput = page.getByPlaceholder('Enter item name');
    this.addItemButton = page.getByRole('button', { name: 'Add Item' });
    this.filterAllButton = page.getByRole('button', { name: 'All' });
    this.filterActiveButton = page.getByRole('button', { name: 'Active' });
    this.filterCompletedButton = page.getByRole('button', { name: 'Completed' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async addItem(name) {
    await this.newItemInput.fill(name);
    await this.addItemButton.click();
  }

  getItem(name) {
    return this.page.locator('li').filter({ hasText: name });
  }

  async toggleItemComplete(name) {
    await this.getItem(name).getByRole('checkbox').click();
  }

  async deleteItem(name) {
    await this.getItem(name).getByRole('button', { name: 'Delete' }).click();
  }

  async filterBy(status) {
    if (status === 'all') {
      await this.filterAllButton.click();
    } else if (status === 'active') {
      await this.filterActiveButton.click();
    } else if (status === 'completed') {
      await this.filterCompletedButton.click();
    }
  }
}

module.exports = { TodoPage };

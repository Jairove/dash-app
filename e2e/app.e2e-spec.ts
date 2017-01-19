import { DashAppPage } from './app.po';

describe('dash-app App', function() {
  let page: DashAppPage;

  beforeEach(() => {
    page = new DashAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

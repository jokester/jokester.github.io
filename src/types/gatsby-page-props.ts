export interface GatsbyPageProps<PageContext = never, PageData = never> {
  path: string; // with trailing slash?
  uri: string; // without trailing slash?
  location: Location;
  pageContext: PageContext;
  data: PageData;
}

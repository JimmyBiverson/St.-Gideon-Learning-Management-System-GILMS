type FrontendPageAPIParams = 'best' | 'top' | 'new' | 'featured';

interface EditorProps extends SharedData {
   project: Project;
   page: ProjectPage;
}

interface FrontendPageProps extends SharedData {
   page: ProjectPage | null;
}

interface FrontendPagesProps extends SharedData {
   project: Project;
}
